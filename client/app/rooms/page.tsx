"use client";

import React, { use, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import QrCode from '@/components/QrCode';
import { useUrl } from 'nextjs-current-url';
import useUser from '../useUser';

const Page = () => {
    const searchParams = useSearchParams();
    const [isQROpen, setQROpen] = useState(false);
    const { href } = useUrl() ?? { href: null }; 
    const { data, isLoading } = useUser();
    console.log("heref",href);
    const QrCodeTitle = "Join Room: " + searchParams.get("id");

    return (
        <div className='flex flex-col gap-2 h-full w-full'>
            <div className='flex bg-blue-300 h-1/5'>
                <p className='text-center m-auto'>Room ID: {searchParams.get("id")}</p>
                <button onClick={() => setQROpen(true)}>Open QR</button>
            </div>
            <div className='flex h-full bg-gray-400'>
                <h1 className='text-2xl m-auto'> 
                    Inhalt
                    <div>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : data?.success ? (
                            <div>
                                <div>Logged in as {data.userId}</div>
                                <div>Room ID: {data.roomId}</div>
                            </div>
                        ) : (
                            <div>Not logged in</div>
                        )}
                    </div>
                </h1>
            </div>
            <QrCode isOpen={isQROpen} onClose={() => setQROpen(false)} title={QrCodeTitle} link={href} />
        </div>
    );
};

export default Page;
