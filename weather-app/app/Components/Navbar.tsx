"use client"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

import { github } from '../utils/Icons'
import SearchBar from './SearchBar'
import ThemeToggle from './ThemeToggle'
import UnitToggle from './UnitToggle'

const Navbar = () => {

  const router = useRouter();

  return (
    <div className='w-full py-4 flex items-center justify-between'>
      <div className="left temp-change">
        <UnitToggle />
      </div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchBar />

        <div className="btn-group flex items-center gap-2">
          <ThemeToggle />

          <Button
            className='source-code flex items-center gap-2'
            onClick={() => router.push("https://github.com")}
          >
            {github}
          </Button>
        </div>

      </div>
    </div>
  )
}

export default Navbar