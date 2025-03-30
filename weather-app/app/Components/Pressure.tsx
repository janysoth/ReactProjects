"use client";

import React from 'react';
import { gauge } from '../utils/Icons';

const Pressure = () => {
  return (
    <div className='pt-6 pb-5 px-4 h-[12rem] border rounded-lg flex flex-col gap-5 dark:bg-dark-grey shadow-sm dark:shadow-none'>
      <div className="top">
        <h2 className="flex items-center gap-2 font-medium">
          {gauge} Pressure
        </h2>

        <p className="pt-4 text-2xl">

        </p>
      </div>

      <p className="text-sm">

      </p>
    </div>
  )
}

export default Pressure