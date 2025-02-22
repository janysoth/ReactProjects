"use client"

import React from 'react';

interface GlobalStyleProps {
  children: React.ReactNode;
}

const GlobalStyleProvider = ({ children }: GlobalStyleProps) => {
  return (
    <div className='global-styles'>
      {children}
    </div>
  )
}

export default GlobalStyleProvider