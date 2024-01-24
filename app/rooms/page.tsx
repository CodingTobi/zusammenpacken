"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';

const Page = () => {
    const searchParams = useSearchParams();

    return (
        <div className='pl-2 flex flex-col gap-2 h-full w-full'>
            <div className='flex bg-blue-300 h-1/5'>
                <p className='text-center m-auto'>Room ID: {searchParams.get("id")}</p>
            </div>
            <div className='flex h-full bg-gray-400'>
                <h1 className='text-2xl m-auto'> 
                    Inhalt
                </h1>
            </div>
        </div>
    );
};

export default Page;
