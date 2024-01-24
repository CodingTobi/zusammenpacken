"use client"

import React from 'react';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { HiPlusCircle } from 'react-icons/hi';
import { IoMdPeople } from 'react-icons/io';
import SidebarItem from './SidebarItem';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Sidebar: React.FC = () => {

  const router = useRouter();
  return (
    <aside className="w-16 bg-gray-800 text-white fixed h-screen z-10">
      <div className="flex flex-col justify-between h-full w-full">
        <nav aria-label="Main">
          <div className='h-2'></div> {/*space before logo, improve?*/}
          <div className='flex m-auto mb-2 w-10 h-10 bg-slate-300 rounded-full cursor-pointer'
          onClick={() => router.push('/')}>
            <Image className='flex m-auto w-[90%]' src="/../favicon.ico" alt="Logo" width={256} height={256} />
          </div>
          <SidebarItem icon={<AiFillHome />} label="Test1" />
          <SidebarItem icon={<IoMdPeople />} label="Test2" />
          <SidebarItem icon={<HiPlusCircle />} label="Test3" />

        </nav>
        <footer className="mb-4">
          <SidebarItem icon={<AiFillSetting />} label="Einstellungen" />
        </footer>
      </div>
    </aside>
  );
};

export default Sidebar;