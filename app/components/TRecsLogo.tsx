'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TRecsLogo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <div className="relative">
        <Image
          src="/images/trex.jpg"
          alt="TRecs Logo"
          width={40}
          height={40}
          className="rounded-full ring-2 ring-green-500/20 group-hover:ring-green-500/40 transition-all duration-300"
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-all duration-300" />
      </div>
      <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent group-hover:from-green-700 group-hover:to-emerald-600 transition-all duration-300">
        TRecs
      </span>
    </Link>
  );
};

export default TRecsLogo; 