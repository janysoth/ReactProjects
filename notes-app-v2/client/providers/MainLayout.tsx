"use client"

import Modal from '@/app/components/Modal/Modal';
import ProfileModal from '@/app/components/Profile/ProfileModal';
import { useTasks } from '@/context/taskContext';
import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
  className: string;
}

const MainLayout = ({ children, className }: MainLayoutProps) => {
  const { isEditing, profileModal } = useTasks();

  return (
    <div className={`main-layout flex-1 bg-[#EDEDED] border-2 border-white rounded-[1.5rem] overflow-auto ${className}`}>
      {isEditing && <Modal />}
      {profileModal && <ProfileModal />}
      {children}
    </div>
  )
}

export default MainLayout