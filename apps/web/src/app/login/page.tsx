'use client';

import AnimatedBackground from '../../components/login/AnimatedBackground';
import Hero from '../../components/login/Hero';
import SignInCard from '../../components/login/SignInCard';

export default function LoginPage() {
  return (
    <>
      <AnimatedBackground />
      <main className="relative flex w-full max-w-4xl flex-col items-center px-6 py-12 text-center md:py-20">
        <Hero />
        <SignInCard />
      </main>
    </>
  );
}
