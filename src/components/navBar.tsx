'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SVGProps } from 'react';

export default function NavBar() {
  const [triggered, setTriggered] = useState(false);

  return (
    <nav className="bg-background/80 backdrop-blur-sm lg:sticky top-0 h-fit z-50">
      <div className="my-4 max-w-prose lg:max-w-6xl mx-auto flex flex-row items-center justify-between px-4">
        <div className="place-items-center text-primary hover:text-primary/80 transition-all font-extrabold text-lg gap-2 flex flex-row items-center">
          <Link href="/" className="flex flex-row items-center gap-2">
            MAKE DECISIONS
          </Link>
        </div>
        <div className="flex flex-row place-items-center gap-4">
          WITH CLAUDE
        </div>
      </div>
    </nav>
  );
}