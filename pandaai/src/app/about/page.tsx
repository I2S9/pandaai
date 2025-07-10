export const metadata = {
  title: 'About us',
};
import Image from 'next/image';
import Footer from '../../components/layout/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-white">
        {/* Our Mission Section */}
        <section className="w-full flex flex-col items-center py-24 px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-center mb-10 text-gray-900">
            Our Mission
          </h1>
          
          {/* Image */}
          <div className="mb-8">
            <Image 
              src="/our-mission.png" 
              alt="Our Mission - A friendly panda with speech bubbles" 
              width={600} 
              height={400} 
              priority
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          
          {/* Text */}
          <div className="max-w-4xl text-center">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              At PandaAI, we believe every high school student deserves personalized, engaging, 24/7 tutoring. Our mission is to turn learning into an adventure guided by a caring panda every step of the way.
            </p>
          </div>
        </section>

        {/* Our Vision Section */}
        <section className="w-full flex flex-col items-center py-24 px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-10 text-gray-900">
            Our Vision
          </h2>
          
          {/* Image */}
          <div className="mb-8">
            <Image 
              src="/our-vision.png" 
              alt="Our Vision - A group of pandas walking towards a bright horizon" 
              width={600} 
              height={400} 
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          
          {/* Text */}
          <div className="max-w-4xl text-center">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              We envision a world where technology and AI work hand in hand to ensure no one feels alone tackling difficult concepts. PandaAI is our promise of ever-available, customized educational support for every learning style.
            </p>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="w-full flex flex-col items-center py-24 px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-10 text-gray-900">
            Our Values
          </h2>
          
          {/* Image */}
          <div className="mb-8">
            <Image 
              src="/our-values.png" 
              alt="Our Values - Core principles that guide our mission" 
              width={600} 
              height={400} 
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
          
          {/* Values Text */}
          <div className="max-w-4xl text-center">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Our core values drive our mission: understanding each student&apos;s challenges, innovating in learning, making education accessible everywhere, fostering joy through fun, and striving for continuous improvement. We&apos;re committed to inclusive, engaging, and evolving education.
            </p>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="w-full flex flex-col items-center py-24 px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-10 text-gray-900">
            Our Team
          </h2>
          
          {/* Polaroid Image with Animation */}
          <div className="mb-8 group">
            <div className="transform group-hover:rotate-2 group-hover:-translate-y-2 transition-all duration-500 ease-in-out">
              <div className="bg-white p-4 rounded-lg shadow-2xl transform rotate-1">
                <Image 
                  src="/our-team.png" 
                  alt="Our Team - A passionate group of developers and educators" 
                  width={300} 
                  height={240} 
                  className="rounded-lg"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
          
          {/* Team Text */}
          <div className="max-w-4xl text-center">
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              A small, passionate team of developers, designers, and educators united by one goal: revolutionize learning.
            </p>
          </div>
        </section>

        {/* Partners & Technology Section */}
        <section className="w-full flex flex-col items-center py-24 px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-10 text-gray-900">
            Partners & Technology
          </h2>
          
          {/* Carousel Logos */}
          <div className="w-full max-w-4xl overflow-hidden">
            <div className="flex items-center gap-8 animate-scroll">
              {/* First set of logos */}
              <div className="flex items-center gap-8 flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/next.svg" 
                      alt="Next.js" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Next.js</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/vercel.svg" 
                      alt="Vercel" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Vercel</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/clerk.webp" 
                      alt="Clerk" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Clerk</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/supabase.png" 
                      alt="Supabase" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Supabase</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/tailwindcss.png" 
                      alt="Tailwind CSS" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Tailwind CSS</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/huggingface.png" 
                      alt="Hugging Face" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Hugging Face</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/openai.png" 
                      alt="OpenAI" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">OpenAI</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/typescript.png" 
                      alt="TypeScript" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">TypeScript</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/nodejs.png" 
                      alt="Node.js" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Node.js</span>
                </div>
              </div>
              
              {/* Duplicate set for seamless loop */}
              <div className="flex items-center gap-8 flex-shrink-0">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/next.svg" 
                      alt="Next.js" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Next.js</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/vercel.svg" 
                      alt="Vercel" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Vercel</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/clerk.webp" 
                      alt="Clerk" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Clerk</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/supabase.png" 
                      alt="Supabase" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Supabase</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/tailwindcss.png" 
                      alt="Tailwind CSS" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Tailwind CSS</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/huggingface.png" 
                      alt="Hugging Face" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Hugging Face</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/openai.png" 
                      alt="OpenAI" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">OpenAI</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/typescript.png" 
                      alt="TypeScript" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">TypeScript</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-4 mb-3">
                    <Image 
                      src="/nodejs.png" 
                      alt="Node.js" 
                      width={50} 
                      height={50} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">Node.js</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Technology Description */}
          <div className="max-w-4xl text-center mt-8">
            <p className="text-lg text-gray-600">
              Built with cutting-edge technologies to deliver the best learning experience
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
} 