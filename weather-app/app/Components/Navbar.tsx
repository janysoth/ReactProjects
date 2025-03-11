"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { github } from '../utils/Icons'
import ThemeDropdown from './ThemeDropdown/ThemeDropdown'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {

  const router = useRouter();

  return (
    <div className='w-full py-4 flex items-center justify-between'>
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <ThemeToggle />

        <Button
          className='source-code flex items-center gap-2'
          onClick={() => router.push("https://github.com")}
        >
          {github}
        </Button>
      </div>
    </div>
  )
}

export default Navbar