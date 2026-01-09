'use client';

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-gray-900"></div>
      <div
        className="absolute inset-0 animate-grid opacity-30 dark:opacity-40"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(0 0 0 / 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 0.15) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      ></div>
      <div
        className="absolute inset-0 animate-grid opacity-20 dark:opacity-30"
        style={{
          backgroundImage: `linear-gradient(to right, rgb(249 115 22 / 0.2) 2px, transparent 2px), linear-gradient(to bottom, rgb(249 115 22 / 0.2) 2px, transparent 2px)`,
          backgroundSize: '120px 120px',
          animationDuration: '30s'
        }}
      ></div>
    </div>
  );
}
