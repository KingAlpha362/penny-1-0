
import Image from 'next/image';
import placeholderImages from '@/lib/placeholder-images.json';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function WelcomePage() {
  const { heroIllustration } = placeholderImages;
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <header className="absolute top-0 left-0 right-0 z-10">
          <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="material-icons text-yellow-500 text-3xl">
                savings
              </span>
              <h1 className="text-2xl font-bold text-gray-800">
                PennyWise
              </h1>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <a
                className="text-gray-600 hover:text-yellow-500 transition-colors"
                href="#"
              >
                Features
              </a>
              <a
                className="text-gray-600 hover:text-yellow-500 transition-colors"
                href="#"
              >
                Pricing
              </a>
              <a
                className="text-gray-600 hover:text-yellow-500 transition-colors"
                href="#"
              >
                About
              </a>
            </div>
            <div className="flex items-center space-x-4">
               <Button variant="ghost" asChild>
                <Link href="/dashboard">Login</Link>
              </Button>
              <Button className="bg-yellow-500 text-white hover:bg-yellow-600" asChild>
                 <Link href="/dashboard">Sign Up</Link>
              </Button>
            </div>
          </nav>
        </header>
        <main className="container mx-auto px-6 pt-32 md:pt-48 pb-24 flex-grow">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
                Make Your Money
                <span className="text-yellow-500">Shine!</span>
              </h2>
              <p className="mt-8 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0">
                Jump into PennyWise, your new best friend for managing money!
                It’s super easy, fun, and packed with cool features to help you
                budget, track spending, and watch your savings grow. Let&apos;s make
                finance feel friendly!
              </p>
              <div className="mt-12 flex justify-center md:justify-start items-center gap-4">
                 <Button size="lg" className="bg-yellow-500 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-yellow-600 transition-all transform hover:scale-105 shadow-lg shadow-yellow-300/50 h-auto">
                    <Link href="/dashboard">Start Today!</Link>
                </Button>
                 <Button size="lg" variant="outline" className="bg-white/50 border-white/40 px-10 py-4 rounded-xl font-bold text-lg h-auto glass hover:bg-gray-100 transition-all shadow-md">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-yellow-500 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14.752 11.167L14.07 10.472A6.554 6.554 0 006.25 8.757c-1.383-.457-2.85.222-3.785 1.263L1.167 13.752A2.75 2.75 0 004.03 17.753l.642-.252a5.206 5.206 0 001.542-1.022A5.164 5.164 0 009.75 14.5a5.164 5.164 0 001.198-1.704c.072-.22.173-.438.297-.654L14.752 11.167z"
                        />
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20.5 14.5c0-1.376-.508-2.695-1.414-3.602a4.934 4.934 0 00-4.916-1.395c-.042.007-.084.013-.126.022L8.75 13.52A6.554 6.554 0 006.25 15.5c-1.383.457-2.85-.222-3.785-1.263L1.167 10.247c.296-1.58.86-3.048 1.58-4.296L5.25 4.842c.359-1.022.943-1.898 1.771-2.588a4.934 4.934 0 014.916-1.395c.042.007.084.013.126.022l5.496 1.485c.498.133.974.327 1.423.56a4.934 4.934 0 011.414 3.602v1.532c.006.13.021.259.045.387L20.5 14.5z"
                        />
                    </svg>
                    See How It Works
                </Button>
              </div>
            </div>
            <div className="relative hero-illustration-bg rounded-3xl p-8 md:p-16 flex items-center justify-center shadow-xl">
              <Image
                alt={heroIllustration.alt}
                className="w-full h-auto max-w-lg transform transition-transform duration-500 hover:scale-105"
                src={heroIllustration.src}
                width={heroIllustration.width}
                height={heroIllustration.height}
                data-ai-hint={heroIllustration['data-ai-hint']}
              />
            </div>
          </div>
        </main>
        <footer className="bg-transparent py-12 mt-auto">
          <div className="container mx-auto px-6 text-center text-gray-500">
            <div className="flex justify-center space-x-6 mb-4">
              <a
                className="hover:text-yellow-500 transition-colors"
                href="#"
              >
                Twitter
              </a>
              <a
                className="hover:text-yellow-500 transition-colors"
                href="#"
              >
                GitHub
              </a>
              <a
                className="hover:text-yellow-500 transition-colors"
                href="#"
              >
                LinkedIn
              </a>
            </div>
            <p>© 2024 PennyWise. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
