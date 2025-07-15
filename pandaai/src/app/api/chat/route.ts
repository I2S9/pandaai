import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    
    // Mode de secours si pas de clé API ou limite atteinte
    if (!OPENROUTER_API_KEY || OPENROUTER_API_KEY === 'your_openrouter_api_key_here') {
      const lastMessage = messages[messages.length - 1]?.content || '';
      
      // Détection de langue simple
      let detectedLanguage = 'french';
      if (lastMessage.match(/\b(the|and|or|but|in|on|at|to|for|with|by|from|what|how|why|when|where|who|which|that|this|these|those|is|are|was|were|have|has|had|do|does|did|can|could|will|would|should|may|might|i|you|he|she|we|they|my|your|his|her|our|their)\b/i)) {
        detectedLanguage = 'english';
      }
      
      const responses = {
        french: "Je suis ton Panda AI Coach, là pour t'épauler dans tes révisions.\n\nJe vois que tu as posé une question. Pour le moment, je suis en mode de test car la clé API OpenRouter n'est pas configurée.\n\nPour activer le chat complet, tu dois :\n\n1. Aller sur https://openrouter.ai/\n2. Créer un compte et obtenir une clé API gratuite\n3. Ajouter cette clé dans le fichier .env.local\n\nEn attendant, je peux t'aider avec des conseils généraux d'étude !",
        english: "I am your Panda AI Coach, here to support you in your studies.\n\nI see you asked a question. Currently, I'm in test mode because the OpenRouter API key is not configured.\n\nTo activate the full chat, you need to:\n\n1. Go to https://openrouter.ai/\n2. Create an account and get a free API key\n3. Add this key to the .env.local file\n\nIn the meantime, I can help you with general study tips!"
      };
      
      return NextResponse.json({
        message: responses[detectedLanguage as keyof typeof responses] || responses.french,
        usage: { total_tokens: 0 }
      });
    }

    // Détecter la langue du dernier message utilisateur
    const lastUserMessage = messages[messages.length - 1]?.content || '';
    
    // Détection simple de la langue basée sur les mots courants
    let detectedLanguage = 'french';
    
    try {
      // Détection plus précise pour le français
      if (lastUserMessage.match(/\b(je|tu|il|elle|nous|vous|ils|elles|le|la|les|un|une|des|ce|ces|mon|ma|mes|ton|ta|tes|son|sa|ses|notre|votre|leur|leurs|qui|que|quoi|où|quand|comment|pourquoi|est|sont|était|étaient|ai|as|a|avons|avez|ont|peux|peut|pouvons|pouvez|peuvent|veux|veut|voulons|voulez|veulent|dois|doit|devons|devez|doivent|suis|es|sont|étais|étais|était|étions|étiez|étaient)\b/i)) {
        detectedLanguage = 'french';
      } else if (lastUserMessage.match(/\b(the|and|or|but|in|on|at|to|for|with|by|from|what|how|why|when|where|who|which|that|this|these|those|is|are|was|were|have|has|had|do|does|did|can|could|will|would|should|may|might|i|you|he|she|we|they|my|your|his|her|our|their)\b/i)) {
        detectedLanguage = 'english';
      } else if (lastUserMessage.match(/\b(die|der|das|und|oder|aber|in|auf|an|zu|für|mit|von|was|wie|warum|wann|wo|wer|welche|das|dies|diese|ist|sind|war|waren|habe|hat|hatte|kann|könnte|wird|würde|sollte|mag|möchte)\b/i)) {
        detectedLanguage = 'german';
      } else if (lastUserMessage.match(/\b(el|la|los|las|y|o|pero|en|sobre|a|para|con|de|qué|cómo|por qué|cuándo|dónde|quién|cuál|que|este|esta|estos|estas|es|son|era|eran|tiene|tienen|tenía|puede|podría|será|sería|debería|puede|podría)\b/i)) {
        detectedLanguage = 'spanish';
      } else if (lastUserMessage.match(/[\u4e00-\u9fff]/)) {
        detectedLanguage = 'chinese';
      } else if (lastUserMessage.match(/[\u3040-\u309f\u30a0-\u30ff]/)) {
        detectedLanguage = 'japanese';
      } else if (lastUserMessage.match(/[\uac00-\ud7af]/)) {
        detectedLanguage = 'korean';
      }
    } catch (error) {
      console.error('Language detection error:', error);
      detectedLanguage = 'french'; // Fallback to French
    }

    // Préparer le contexte du Panda Coach avec la langue détectée
    const systemMessage = {
      role: 'system',
      content: `Tu es Panda Coach, un assistant IA bienveillant et professionnel spécialisé dans l'aide aux études.

RÈGLE ABSOLUE DE LANGUE :
Tu DOIS répondre UNIQUEMENT en ${detectedLanguage === 'english' ? 'anglais' : detectedLanguage === 'german' ? 'allemand' : detectedLanguage === 'spanish' ? 'espagnol' : detectedLanguage === 'chinese' ? 'chinois' : detectedLanguage === 'japanese' ? 'japonais' : detectedLanguage === 'korean' ? 'coréen' : 'français'}.

INTRODUCTION OBLIGATOIRE :
Commence TOUJOURS tes réponses par cette introduction dans la langue détectée :
- Français : "Je suis ton Panda AI Coach, là pour t'épauler dans tes révisions."
- Anglais : "I am your Panda AI Coach, here to support you in your studies."
- Allemand : "Ich bin dein Panda AI Coach, hier um dich bei deinen Studien zu unterstützen."
- Espagnol : "Soy tu Panda AI Coach, aquí para apoyarte en tus estudios."
- Chinois : "我是你的熊猫AI教练，在这里支持你的学习。"
- Japonais : "私はあなたのパンダAIコーチです。勉強をサポートするためにここにいます。"
- Coréen : "나는 당신의 판다 AI 코치입니다. 공부를 지원하기 위해 여기 있습니다."

Ton rôle :
Aider les étudiants avec leurs questions académiques, expliquer des concepts complexes de manière simple et claire, donner des conseils d'étude personnalisés, créer des plans d'apprentissage adaptés, et motiver l'étudiant.

RÈGLES STRICTES D'ÉCRITURE :
- RÈGLE ABSOLUE : Réponds UNIQUEMENT en ${detectedLanguage === 'english' ? 'anglais' : detectedLanguage === 'german' ? 'allemand' : detectedLanguage === 'spanish' ? 'espagnol' : detectedLanguage === 'chinese' ? 'chinois' : detectedLanguage === 'japanese' ? 'japonais' : detectedLanguage === 'korean' ? 'coréen' : 'français'}
- COMMENCE TOUJOURS par l'introduction dans la langue détectée
- Écris SANS AUCUN EMOJI (interdit total)
- SAUTE DEUX LIGNES APRÈS CHAQUE DEUX PHRASES pour aérer le texte
- Si tu fais une liste numérotée, saute deux lignes entre chaque point
- Fais des paragraphes courts et aérés
- Sois encourageant et positif
- Explique les choses étape par étape
- Propose des exemples concrets
- Reste toujours bienveillant et patient
- N'utilise JAMAIS de markdown (pas de ** ou __ ou # ou autres symboles)
- Écris en texte simple et lisible sans aucun formatage spécial

Domaines d'expertise :
Mathématiques, sciences, langues, histoire, techniques d'étude et de mémorisation, gestion du stress et de la motivation, organisation du temps d'étude, préparation aux examens.

IMPORTANT : Tu as détecté que l'utilisateur parle en ${detectedLanguage === 'english' ? 'anglais' : detectedLanguage === 'german' ? 'allemand' : detectedLanguage === 'spanish' ? 'espagnol' : detectedLanguage === 'chinese' ? 'chinois' : detectedLanguage === 'japanese' ? 'japonais' : detectedLanguage === 'korean' ? 'coréen' : 'français'}. Réponds UNIQUEMENT dans cette langue et commence par l'introduction appropriée.`
    };

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'https://pandaai.vercel.app',
        'X-Title': 'PandaAI - Plateforme d\'apprentissage IA',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [systemMessage, ...messages],
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      // Gestion spéciale pour l'erreur 429 (Too Many Requests)
      if (response.status === 429) {
        const fallbackResponses = {
          french: "Je suis ton Panda AI Coach, là pour t'épauler dans tes révisions.\n\nJe vois que tu as atteint la limite de requêtes gratuites pour aujourd'hui. C'est normal avec les comptes gratuits d'OpenRouter qui ont des limites strictes.\n\nPour continuer à utiliser le chat sans limite :\n\n1. Attends quelques minutes avant de réessayer\n2. Ou passe à un compte payant sur OpenRouter\n3. Ou utilise le mode de test qui fonctionne sans limite\n\nEn attendant, je peux t'aider avec des conseils d'étude généraux !",
          english: "I am your Panda AI Coach, here to support you in your studies.\n\nI see you've reached the free request limit for today. This is normal with free OpenRouter accounts which have strict limits.\n\nTo continue using the chat without limits:\n\n1. Wait a few minutes before trying again\n2. Or upgrade to a paid account on OpenRouter\n3. Or use the test mode which works without limits\n\nIn the meantime, I can help you with general study tips!"
        };
        
        return NextResponse.json({
          message: fallbackResponses[detectedLanguage as keyof typeof fallbackResponses] || fallbackResponses.french,
          usage: { total_tokens: 0 }
        });
      }
      
      const errorData = await response.text();
      console.error('OpenRouter API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to get response from AI' },
        { status: response.status }
      );
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      return NextResponse.json(
        { error: 'Invalid response from AI' },
        { status: 500 }
      );
    }

    // Nettoyer le message des markdown et formater
    let cleanMessage = data.choices[0].message.content;
    
    // Supprimer TOUS les emojis
    cleanMessage = cleanMessage.replace(/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/gu, '');
    
    // Supprimer TOUS les symboles markdown (pas de formatage)
    cleanMessage = cleanMessage.replace(/\*\*(.*?)\*\*/g, '$1'); // Supprimer **mot**
    cleanMessage = cleanMessage.replace(/__(.*?)__/g, '$1'); // Supprimer __mot__
    cleanMessage = cleanMessage.replace(/#{1,6}\s/g, ''); // Titres
    cleanMessage = cleanMessage.replace(/\*([^*]+)\*/g, '$1'); // Italique simple
    cleanMessage = cleanMessage.replace(/`([^`]+)`/g, '$1'); // Code inline
    cleanMessage = cleanMessage.replace(/~~([^~]+)~~/g, '$1'); // Barré
    
    // Aération forcée : saut de 2 lignes après chaque 2 phrases
    const sentences = cleanMessage.split(/[.!?]+/).filter((s: string) => s.trim().length > 0);
    const aeratedSentences = [];
    
    for (let i = 0; i < sentences.length; i++) {
      aeratedSentences.push(sentences[i].trim());
      if ((i + 1) % 2 === 0 && i < sentences.length - 1) {
        aeratedSentences.push(''); // Ligne vide
        aeratedSentences.push(''); // Deuxième ligne vide pour plus d'espace
      }
    }
    
    cleanMessage = aeratedSentences.join('. ');

    return NextResponse.json({
      message: cleanMessage,
      usage: data.usage
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 