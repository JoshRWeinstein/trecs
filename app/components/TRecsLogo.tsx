'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const TRecsLogo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center">
        <span className="text-white font-bold text-xl">T</span>
      </div>
      <span className="text-xl font-bold text-gray-800">TRecs</span>
    </Link>
  );
};

export default TRecsLogo; 