import Image from 'next/image';
import Footer from '../../components/layout/Footer';

const steps = [
  {
    num: 1,
    img: '/choose-topic.png',
    title: 'Choose your topic',
    text: "Select a subject from our wide range of options, or simply type your question directly—whether it’s math, science, languages, or any other field. Your Panda Coach is ready to help!",
    align: 'left',
  },
  {
    num: 2,
    img: '/choose-ai-tutor.png',
    title: 'Choose your Ai Tutor',
    text: "An adaptive algorithm that automatically schedules review sessions just before forgetfulness sets in, for each user.",
    align: 'right',
  },
  {
    num: 3,
    img: '/ask-question.png',
    title: 'Ask your question',
    text: "Explain exactly where you’re stuck—whether it’s a tricky formula, a challenging exercise, or a concept you just can’t grasp. The more details you give, the better your Panda Coach can assist!",
    align: 'left',
  },
  {
    num: 4,
    img: '/instant-analysis.png',
    title: 'Instant analysis',
    text: "Our AI instantly dissects your problem, identifying key concepts and common pitfalls to provide the most relevant guidance. No more guessing—just clear, targeted support.",
    align: 'right',
  },
  {
    num: 5,
    img: '/quiz-and-review.png',
    title: 'Quiz & Review',
    text: "Reinforce your learning with a quick, personalized quiz. Test your knowledge and make sure you’ve mastered the topic before moving forward!",
    align: 'left',
  },
];

export default function AiTutoringPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-white">
        {/* Titre principal */}
        <section className="w-full flex flex-col items-center pt-24 pb-12 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-16 text-gray-900">
            Discover Ai Tutoring
          </h1>
          {/* Panda Coach */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl mx-auto mb-24">
            <div className="flex-shrink-0">
              <Image src="/panda-coach.png" alt="Your Panda Coach" width={260} height={260} className="object-contain" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Your Panda Coach</h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-xl">
                Your panda assistant, always here to help you understand and improve
              </p>
            </div>
          </div>
        </section>

        {/* Step by Step guide timeline */}
        <section className="w-full flex flex-col items-center px-2 md:px-0">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 mt-8">Step by Step guide</h2>
          <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
            {/* Timeline verticale */}
            <div className="absolute left-1/2 top-0 h-full flex flex-col items-center z-0" style={{transform: 'translateX(-50%)'}}>
              <span className="w-6 h-6 rounded-full bg-[#DDBDFD] block mb-0.5" />
              <div className="w-2 bg-[#DDBDFD] flex-1" style={{minHeight: '60px'}} />
              <span className="w-6 h-6 rounded-full bg-[#DDBDFD] block mt-0.5" />
            </div>
            <div className="flex flex-col gap-0 w-full z-10">
              {steps.map((step) => (
                <div key={step.num} className={`flex flex-col md:flex-row w-full items-center mb-0 relative`} style={{minHeight: 180}}>
                  {step.align === 'left' ? (
                    <>
                      {/* Image à gauche */}
                      <div className="w-full md:w-1/2 flex justify-end md:pr-12 mb-4 md:mb-0">
                        <Image src={step.img} alt={step.title} width={240} height={240} className="object-contain" />
                      </div>
                      {/* Timeline + contenu */}
                      <div className="hidden md:flex flex-col items-center w-0 relative" style={{zIndex: 2}}>
                        <div className="w-8 h-8 bg-[#DDBDFD] rounded-xl flex items-center justify-center text-white font-bold text-lg mb-2">{step.num}</div>
                        <div className="h-full w-2 bg-transparent" />
                      </div>
                      <div className="w-full md:w-1/2 flex flex-col items-start md:pl-12">
                        <div className="flex items-center mb-2 md:mb-0">
                          <div className="md:hidden w-8 h-8 bg-[#DDBDFD] rounded-xl flex items-center justify-center text-white font-bold text-lg mr-2">{step.num}</div>
                          <h3 className="font-bold text-lg md:text-xl">{step.title}</h3>
                        </div>
                        <p className="text-gray-700 text-base md:text-lg max-w-md text-left">{step.text}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full md:w-1/2 flex flex-col items-end md:pr-12 order-2 md:order-1">
                        <div className="flex items-center justify-end mb-2 md:mb-0">
                          <h3 className="font-bold text-lg md:text-xl mr-2">{step.title}</h3>
                          <div className="md:hidden w-8 h-8 bg-[#DDBDFD] rounded-xl flex items-center justify-center text-white font-bold text-lg ml-2">{step.num}</div>
                        </div>
                        <p className="text-gray-700 text-base md:text-lg max-w-md text-right">{step.text}</p>
                      </div>
                      <div className="hidden md:flex flex-col items-center w-0 relative order-2 md:order-2" style={{zIndex: 2}}>
                        <div className="w-8 h-8 bg-[#DDBDFD] rounded-xl flex items-center justify-center text-white font-bold text-lg mb-2">{step.num}</div>
                        <div className="h-full w-2 bg-transparent" />
                      </div>
                      <div className="w-full md:w-1/2 flex justify-start md:pl-12 order-1 md:order-3 mb-4 md:mb-0">
                        <Image src={step.img} alt={step.title} width={240} height={240} className="object-contain" />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="w-full flex flex-col items-center py-28">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Key Features</h2>
          <div className="w-full max-w-2xl flex flex-row items-center justify-center gap-8 bg-[#DDBDFD] rounded-2xl py-8 px-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-xl mb-3 flex items-center justify-center">
                <Image src="/tutoring.svg" alt="24/7 Tutoring" width={28} height={28} className="object-contain" />
              </div>
              <span className="text-white font-semibold text-lg">24/7 Tutoring</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-xl mb-3 flex items-center justify-center">
                <Image src="/ai-learning.svg" alt="AI Personalization" width={28} height={28} className="object-contain" />
              </div>
              <span className="text-white font-semibold text-lg">AI Personalization</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-white rounded-xl mb-3 flex items-center justify-center">
                <Image src="/progress-tracking.svg" alt="Progress Tracking" width={28} height={28} className="object-contain" />
              </div>
              <span className="text-white font-semibold text-lg">Progress Tracking</span>
            </div>
          </div>
        </section>

        {/* Ready to start section */}
        <section className="w-full flex flex-col items-center py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Ready to start your personalized tutoring?</h2>
          <Image src="/ready-tutoring.png" alt="Ready to start your personalized tutoring?" width={420} height={420} className="object-contain mb-0" />
        </section>
      </main>
      <Footer />
    </div>
  );
} 