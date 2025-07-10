import Image from 'next/image';

const features = [
  {
    title: 'Spaced Repetition Algorithm',
    description: 'An adaptive algorithm that automatically schedules review sessions just before forgetfulness sets in, for each user',
    image: '/space-repetition.png',
    alt: 'Spaced Repetition Graph',
    color: '#DDBDFD',
  },
  {
    title: 'Choose your Ai Tutor',
    description: 'Pick your favorite panda avatar to guide you through your learning journey with personalized tips and encouragement!',
    image: '/panda-groupe-4.png',
    alt: 'Panda Avatars',
    color: '#FFE066', // jaune plus foncé
  },
  {
    title: 'Create flashcards',
    description: 'Easily generate personalized flashcards with your key concepts, and let the algorithm optimize your review schedule for maximum retention.',
    image: '/flashcards.png',
    alt: 'Flashcards',
    color: '#F687B3', // rose pastel plus soutenu
  },
  {
    title: 'Track your progress',
    description: 'Visualize your learning stats and stay motivated with cute analytics and rewards as you progress!',
    image: '/track-progress.png',
    alt: 'Track Progress',
    color: '#B6E0FE', // bleu ciel pastel
  },
];

export default function AlternatingFeatures() {
  return (
    <section className="w-full flex flex-col gap-24 items-center justify-center my-24 px-4">
      {features.map((feature, idx) => (
        <div
          key={feature.title}
          className={`w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-10 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
        >
          {/* Texte */}
          <div className={`flex-1 flex flex-col ${idx % 2 === 1 ? 'items-end text-right' : 'items-start text-left'}`}>
            <h3 className="font-semibold text-3xl mb-2 flex items-center gap-3">
              <span
                className="inline-flex items-center justify-center w-12 h-12 rounded-lg mr-2"
                style={{ backgroundColor: feature.color }}
              >
                <Image src="/icon.svg" alt="icon" width={28} height={28} />
              </span>
              {feature.title}
            </h3>
            <p className="text-lg text-gray-700 max-w-xl">{feature.description}</p>
          </div>
          {/* Image */}
          <div className={`flex-1 flex items-center ${
            idx === 0 ? 'justify-end' : 
            idx === 1 ? 'justify-start' : 
            idx === 2 ? 'justify-end' : // flashcards - aligner à droite
            'justify-start' // track progress - aligner à gauche
          }`}>
            <Image
              src={feature.image}
              alt={feature.alt}
              width={idx === 0 ? 440 : idx === 1 ? 220 : idx === 2 ? 280 : 220}
              height={idx === 0 ? 260 : idx === 1 ? 180 : idx === 2 ? 180 : 140}
              style={
                idx === 0
                  ? { maxWidth: '440px', width: '100%', height: 'auto' }
                  : idx === 1
                  ? { maxWidth: '220px', width: '100%', height: 'auto' }
                  : idx === 2
                  ? { maxWidth: '280px', width: '100%', height: 'auto' } // flashcards - plus grand
                  : { maxWidth: '220px', width: '100%', height: 'auto' } // track progress
              }
            />
          </div>
        </div>
      ))}
    </section>
  );
} 