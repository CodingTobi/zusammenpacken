"use client"

import React, { useEffect } from 'react';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { HiPlusCircle } from 'react-icons/hi';
import SidebarItem from './SidebarItem';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  className,
}) => {
  const authContext = useAuth(); // Get the AuthContext values
  const { isAuthenticated, isLoading, login } = authContext || {}; // Destructure the AuthContext values with a conditional check

  useEffect(() => {
    console.debug("isAuthenticated:", isAuthenticated);
    router.refresh();
  }, [isAuthenticated]);


  useEffect(() => {
    login();
  }, []);

  const router = useRouter();
  return (
    <aside className={className}>
      <div className="flex flex-col justify-between h-full w-full">
        <nav aria-label="Main">
          <div className='h-2'></div> {/*space before logo, improve?*/}
          <div className='flex m-auto mb-2 w-10 h-10 bg-slate-300 rounded-full cursor-pointer'
            onClick={() => router.push('/')}>
            <Image className='flex m-auto w-[90%]' src="/../favicon.ico" alt="Logo" width={256} height={256} />
          </div>
          <SidebarItem icon={<AiFillHome />} label="Test1" />
          <SidebarItem icon={<HiPlusCircle />} label="Test3" onClick={() => router.push('/join')} />



        </nav>
        <footer className="mb-4">
          <SidebarItem icon={<AiFillSetting />} label="Einstellungen" />
        </footer>
      </div>
    </aside>
  );
};

export default Sidebar;