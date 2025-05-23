import Link from "next/link";
import React, { ReactNode } from 'react';

interface IconLinkProps {
  href: string;
  icon: ReactNode;
  handleClick?: () => void;
}

const IconLink = ({ href, icon, handleClick }: IconLinkProps) => {
  return (
    <Link
      href={href}
      passHref
      target="_blank"
      rel="noopener noreferrer"
      className="h-10 w-10 text-purple-500 rounded-full flex items-center justify-center text-lg border-2 border-[#E6E6E6] hover:bg-[#E6E6E6]"
      onClick={handleClick}
    >
      {icon}
    </Link>
  );
}

export default IconLink