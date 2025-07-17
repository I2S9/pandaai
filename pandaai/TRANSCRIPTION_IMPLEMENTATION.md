# Implémentation des Fonctionnalités de Transcription

## Vue d'ensemble

Ce document explique comment implémenter les vraies fonctionnalités de transcription pour Smart Notes, en remplaçant les simulations actuelles par des APIs professionnelles.

## 1. Transcription Audio (Whisper API)

### Installation
```bash
npm install openai
```

### Configuration
Ajoutez dans `.env.local` :
```env
OPENAI_API_KEY=your_openai_api_key_here
```

### Implémentation dans `/api/transcribe-audio/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    
    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Convertir le fichier en buffer
    const buffer = Buffer.from(await audioFile.arrayBuffer());
    
    // Transcription avec Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: new File([buffer], audioFile.name, { type: audioFile.type }),
      model: "whisper-1",
      language: "auto", // Détection automatique
    });

    return NextResponse.json({
      transcription: transcription.text,
      success: true
    });

  } catch (error) {
    console.error('Audio transcription error:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 }
    );
  }
}
```

## 2. Transcription YouTube

### Installation
```bash
npm install youtube-transcript-api ytdl-core
```

### Implémentation dans `/api/transcribe-youtube/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript-api';
import ytdl from 'ytdl-core';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();
    
    if (!url) {
      return NextResponse.json(
        { error: 'No YouTube URL provided' },
        { status: 400 }
      );
    }

    // Extraire l'ID de la vidéo
    const videoId = ytdl.getVideoID(url);
    
    // Obtenir la transcription
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    
    // Combiner tous les segments
    const fullText = transcript
      .map(segment => segment.text)
      .join(' ');

    return NextResponse.json({
      transcription: fullText,
      success: true
    });

  } catch (error) {
    console.error('YouTube transcription error:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe YouTube video' },
      { status: 500 }
    );
  }
}
```

## 3. Génération PDF Réelle

### Installation
```bash
npm install jspdf html2canvas
```

### Implémentation dans la page Smart Notes

```typescript
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const downloadPDF = async () => {
  if (!generatedNotes) return;
  
  const element = document.getElementById('notes-content');
  if (!element) return;
  
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  
  const pdf = new jsPDF();
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  
  let position = 0;
  
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;
  
  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  
  pdf.save('smart-notes.pdf');
};
```

## 4. Mind Map Visuel

### Installation
```bash
npm install react-flow-renderer
```

### Composant MindMapDisplay

```typescript
import React from 'react';
import ReactFlow, { 
  Node, 
  Edge, 
  Controls, 
  Background 
} from 'react-flow-renderer';

interface MindMapNode {
  id: string;
  label: string;
  position: { x: number; y: number };
}

interface MindMapConnection {
  id: string;
  source: string;
  target: string;
}

const MindMapDisplay = ({ content }: { content: string }) => {
  // Parser le contenu JSON pour créer les nœuds et connexions
  const parseMindMap = (content: string) => {
    try {
      const data = JSON.parse(content);
      // Convertir en format ReactFlow
      const nodes: Node[] = data.nodes.map((node: MindMapNode) => ({
        id: node.id,
        data: { label: node.label },
        position: node.position,
        type: 'default',
        style: {
          background: '#8B3FFC',
          color: 'white',
          border: '2px solid #7C3AED',
          borderRadius: '8px',
          padding: '10px',
          fontSize: '14px',
          fontWeight: 'bold',
        },
      }));
      
      const edges: Edge[] = data.connections.map((conn: MindMapConnection) => ({
        id: conn.id,
        source: conn.source,
        target: conn.target,
        type: 'smoothstep',
        style: { stroke: '#8B3FFC', strokeWidth: 2 },
        animated: true,
      }));
      
      return { nodes, edges };
    } catch {
      // Fallback si le parsing échoue
      return { nodes: [], edges: [] };
    }
  };

  const { nodes, edges } = parseMindMap(content);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        attributionPosition="bottom-left"
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};
```

## 5. Variables d'environnement requises

```env
# OpenAI pour Whisper
OPENAI_API_KEY=your_openai_api_key_here

# YouTube Data API (optionnel)
YOUTUBE_API_KEY=your_youtube_api_key_here

# OpenRouter pour Smart Notes
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## 6. Coûts estimés

### Whisper API
- $0.006 par minute d'audio
- Très précis et rapide

### YouTube Transcription
- Gratuit avec youtube-transcript-api
- Limité aux vidéos avec sous-titres

### OpenRouter
- Gratuit jusqu'à 1000 requêtes/mois
- Puis $0.002 par 1K tokens

## 7. Étapes de déploiement

1. **Obtenir les clés API** :
   - OpenAI API key pour Whisper
   - YouTube Data API key (optionnel)

2. **Installer les dépendances** :
   ```bash
   npm install openai youtube-transcript-api ytdl-core jspdf html2canvas react-flow-renderer
   ```

3. **Mettre à jour les fichiers** :
   - Remplacer le contenu des APIs de transcription
   - Mettre à jour le composant MindMapDisplay
   - Implémenter la génération PDF

4. **Tester** :
   - Tester l'enregistrement audio
   - Tester les URLs YouTube
   - Vérifier la génération PDF
   - Tester le mind map

## 8. Améliorations futures

- **Support multilingue** : Détection automatique de langue
- **Sous-titres personnalisés** : Permettre l'upload de fichiers .srt
- **Export avancé** : Word, PowerPoint, etc.
- **Collaboration** : Partage de notes entre utilisateurs
- **Synchronisation** : Intégration avec Google Drive, Dropbox 