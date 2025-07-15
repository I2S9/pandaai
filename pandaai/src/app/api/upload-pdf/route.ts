import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    // Vérifier que c'est un PDF
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Seuls les fichiers PDF sont acceptés' },
        { status: 400 }
      );
    }

    // Vérifier la taille (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Le fichier est trop volumineux (max 10MB)' },
        { status: 400 }
      );
    }

    // Pour l'instant, on simule l'extraction du texte
    // TODO: Implémenter l'extraction réelle du texte PDF avec une librairie comme pdf-parse
    const extractedText = `Contenu extrait du fichier PDF: ${file.name}
    
    Ce fichier contient des informations qui peuvent être analysées par Panda Coach.
    L'utilisateur peut maintenant poser des questions spécifiques sur ce document.`;

    // Message simple selon la langue (détection basique)
    const userLanguage = request.headers.get('accept-language') || 'fr';
    let message = 'Fichier joint';
    
    if (userLanguage.startsWith('en')) {
      message = 'File attached';
    } else if (userLanguage.startsWith('de')) {
      message = 'Datei angehängt';
    } else if (userLanguage.startsWith('es')) {
      message = 'Archivo adjunto';
    }

    return NextResponse.json({
      success: true,
      filename: file.name,
      extractedText: extractedText,
      message: message
    });

  } catch (error) {
    console.error('Upload PDF error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'upload du fichier' },
      { status: 500 }
    );
  }
} 