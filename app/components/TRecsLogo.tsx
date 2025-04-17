'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TRecsLogo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/images/trex.jpg"
        alt="TRecs Logo"
        width={40}
        height={40}
        className="rounded-full"
      />
      <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent tracking-wide">
        TRecs
      </span>
    </Link>
  );
};

export default TRecsLogo; 