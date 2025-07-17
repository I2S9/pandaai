"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Composant pour afficher le mind map
const MindMapDisplay = ({ content }: { content: string }) => {
  // Parser le contenu pour créer un mind map simple
  const parseMindMap = (content: string) => {
    try {
      // Essayer de parser comme JSON d'abord
      const data = JSON.parse(content);
      return data;
    } catch {
      // Si ce n'est pas du JSON, créer un mind map à partir du texte
      const lines = content.split('\n').filter(line => line.trim());
      const nodes = [];
      const connections = [];
      
      let nodeId = 1;
      const mainTopic = lines[0] || 'Main Topic';
      nodes.push({
        id: 'main',
        label: mainTopic,
        x: 200,
        y: 100,
        level: 0
      });
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line && !line.startsWith('•') && !line.startsWith('-')) {
          const node = {
            id: `node-${nodeId}`,
            label: line,
            x: 100 + (nodeId % 3) * 150,
            y: 200 + Math.floor(nodeId / 3) * 100,
            level: 1
          };
          nodes.push(node);
          connections.push({
            id: `conn-${nodeId}`,
            from: 'main',
            to: `node-${nodeId}`
          });
          nodeId++;
        }
      }
      
      return { nodes, connections };
    }
  };

  const mindMapData = parseMindMap(content);

  return (
    <div className="relative w-full h-96 bg-white rounded-lg border">
      <svg width="100%" height="100%" className="absolute inset-0">
        {/* Connexions */}
        {mindMapData.connections?.map((conn: { id: string; from: string; to: string }) => {
          const fromNode = mindMapData.nodes.find((n: { id: string; x: number; y: number }) => n.id === conn.from);
          const toNode = mindMapData.nodes.find((n: { id: string; x: number; y: number }) => n.id === conn.to);
          if (fromNode && toNode) {
            return (
              <line
                key={conn.id}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke="#8B3FFC"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          }
          return null;
        })}
        
        {/* Flèche */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="#8B3FFC" />
          </marker>
        </defs>
      </svg>
      
      {/* Nœuds */}
      {mindMapData.nodes?.map((node: { id: string; label: string; x: number; y: number; level: number }) => (
        <div
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: node.x, top: node.y }}
        >
          <div className={`
            px-4 py-2 rounded-lg border-2 text-center text-sm font-semibold whitespace-nowrap
            ${node.level === 0 
              ? 'bg-[#8B3FFC] text-white border-[#7C3AED]' 
              : 'bg-white text-gray-800 border-[#8B3FFC]'
            }
          `}>
            {node.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function SmartNotesResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [transcription, setTranscription] = useState('');
  const [selectedOutputType, setSelectedOutputType] = useState('smart_notes');
  const [generatedNotes, setGeneratedNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Récupérer la transcription depuis les paramètres d'URL
    const transcriptionParam = searchParams.get('transcription');
    if (transcriptionParam) {
      setTranscription(decodeURIComponent(transcriptionParam));
    }
  }, [searchParams]);

  const generateNotes = async () => {
    if (!transcription.trim()) {
      setError('No transcription available');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const response = await fetch('/api/smart-notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'generate_notes',
          content: transcription,
          outputType: selectedOutputType
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate notes');
      }

      const data = await response.json();
      setGeneratedNotes(data.content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate notes');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadPDF = async () => {
    if (!generatedNotes) return;
    
    try {
      // Créer un élément temporaire pour le contenu
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '800px';
      tempDiv.style.padding = '40px';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      tempDiv.style.fontSize = '14px';
      tempDiv.style.lineHeight = '1.6';
      tempDiv.style.color = '#333';
      
      // Ajouter le contenu
      tempDiv.innerHTML = `
        <h1 style="color: #8B3FFC; font-size: 24px; margin-bottom: 20px; text-align: center;">Smart Notes</h1>
        <div style="white-space: pre-wrap; margin-bottom: 20px;">${generatedNotes}</div>
        <div style="text-align: center; color: #666; font-size: 12px; margin-top: 40px;">
          Generated by PandaAI Smart Notes
        </div>
      `;
      
      document.body.appendChild(tempDiv);
      
      // Utiliser html2canvas pour capturer
      const canvas = await import('html2canvas').then(module => module.default(tempDiv, {
        width: 800,
        height: tempDiv.scrollHeight,
        scale: 2,
        backgroundColor: '#ffffff'
      }));
      
      // Créer le PDF avec fallback
      try {
        // @ts-expect-error - jsPDF module import
        const jsPDF = (await import('jspdf')).default;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const imgData = canvas.toDataURL('image/png');
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
      } catch (pdfError) {
        console.error('PDF generation failed, using text fallback:', pdfError);
        // Fallback vers téléchargement texte
        const blob = new Blob([generatedNotes], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'smart-notes.txt';
        a.click();
        URL.revokeObjectURL(url);
      }
      
      // Nettoyer
      document.body.removeChild(tempDiv);
    } catch (error) {
      console.error('PDF generation error:', error);
      // Fallback vers téléchargement texte
      const blob = new Blob([generatedNotes], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'smart-notes.txt';
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center py-12 px-4">
      {/* Titre */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8">Smart Notes Results</h1>
      
      {/* Bouton retour */}
      <button
        onClick={() => router.push('/smart-notes')}
        className="mb-8 bg-[#DDBDFD] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-6 py-3 shadow-lg border-2 border-[#DDBDFD] transition cursor-pointer"
        style={{boxShadow: '0 4px 0 #B373E4'}}
      >
        ← Back to Smart Notes
      </button>

      <div className="w-full max-w-4xl space-y-8">
        {/* Transcription */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Transcription</h2>
          <div className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-y-auto">
            {transcription ? (
              <p className="text-gray-800 whitespace-pre-wrap">{transcription}</p>
            ) : (
              <p className="text-gray-500 italic">No transcription available...</p>
            )}
          </div>
        </div>

        {/* Options de génération */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Generate Smart Notes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { id: 'smart_notes', label: 'Smart Notes', icon: '📝' },
              { id: 'summary', label: 'Summary', icon: '📋' },
              { id: 'detailed_transcript', label: 'Detailed Transcript', icon: '📄' },
              { id: 'mind_map', label: 'Mind Map', icon: '🗺️' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setSelectedOutputType(option.id)}
                className={`p-4 rounded-xl border-2 transition ${
                  selectedOutputType === option.id
                    ? 'border-[#8B3FFC] bg-[#F3F0FF]'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{option.icon}</div>
                <div className="text-sm font-semibold text-gray-900">{option.label}</div>
              </button>
            ))}
          </div>
          
          <button
            onClick={generateNotes}
            disabled={isProcessing}
            className="w-full bg-[#DDBDFD] hover:translate-y-1 hover:shadow-sm active:translate-y-1 active:shadow-sm text-white font-bold rounded-xl px-6 py-4 text-lg shadow-lg border-2 border-[#DDBDFD] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            style={{boxShadow: '0 4px 0 #B373E4'}}
          >
            {isProcessing ? 'Generating...' : 'Smart Generation'}
          </button>
        </div>

        {/* Notes générées */}
        {generatedNotes && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Generated Notes</h2>
            {selectedOutputType === 'mind_map' ? (
              <div className="bg-gray-50 rounded-xl p-4 max-h-96 overflow-auto">
                <MindMapDisplay content={generatedNotes} />
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl p-4 max-h-96 overflow-y-auto">
                <div className="text-gray-800 whitespace-pre-wrap">{generatedNotes}</div>
              </div>
            )}
            <div className="mt-4 flex gap-4">
              <button
                onClick={() => navigator.clipboard.writeText(generatedNotes)}
                className="bg-[#8B3FFC] hover:bg-[#7C3AED] text-white font-bold rounded-xl px-6 py-3 transition"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([generatedNotes], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'smart-notes.txt';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl px-6 py-3 transition"
              >
                Download TXT
              </button>
              <button
                onClick={downloadPDF}
                className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl px-6 py-3 transition"
              >
                Download PDF
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
} 