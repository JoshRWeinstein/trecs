'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function TRecsLogo() {
  return (
    <Link href="/" className="flex items-center space-x-3">
      <div className="relative w-10 h-10">
        <Image
          src="/images/trex.jpg"
          alt="TRecs Logo"
          width={40}
          height={40}
          className="object-contain"
          priority
        />
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
        TRecs
      </span>
    </Link>
  );
} 