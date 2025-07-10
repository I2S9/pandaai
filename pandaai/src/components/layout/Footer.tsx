import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-[#DDBDFD] py-12 flex flex-col items-center justify-center mt-20">
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <Image src="/logo-pandaai.svg" alt="PandaAI Logo" width={48} height={48} />
        <span className="text-2xl font-bold text-white">PandaAI</span>
      </div>
      <div className="text-white text-lg mb-2">© {new Date().getFullYear()} PandaAI. All rights reserved.</div>
      <div className="text-white text-base">Made with love for students worldwide · <a href="mailto:support@pandaai.com" className="underline">Contact us</a></div>
    </footer>
  );
} 