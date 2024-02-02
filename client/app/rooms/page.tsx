"use client";

import React, { use, useEffect, useState, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import QrCode from '@/components/QrCode';
import { useUrl } from 'nextjs-current-url';
import useUser from '../useUser';

import { validateRoomId } from '@/utils/helpers';
import { useAuth } from '@/contexts/AuthContext'; // Import the AuthContext

const Page = () => {
    const searchParams = useSearchParams();
    const page_roomId = searchParams.get("id");
    const [isQROpen, setQROpen] = useState(false);
    const { href } = useUrl() ?? { href: "" };
    const router = useRouter();
    const authContext = useAuth(); // Get the AuthContext values
    const { userId, roomId, isAuthenticated, isRoomOwner, isLoading, login, register } = authContext || {}; // Destructure the AuthContext values with a conditional check

    useEffect(() => {
            if (!page_roomId || !validateRoomId(page_roomId))
            router.replace("/join");
    }, [page_roomId, router]);

    useEffect(() => {
        if (!isLoading)
            router.refresh();
    }, [isLoading, router]);

    useEffect(() => {
        register(page_roomId || "", true); // Call the register function from the AuthContext
        
    }, [page_roomId, register]);

    return (
        <div className='flex flex-col gap-2 h-full w-full'>
            <div className='flex bg-blue-300 h-1/5'>
                <p className='text-center m-auto'>Room ID: {page_roomId}</p>
                <button onClick={() => setQROpen(true)}>Open QR</button>
            </div>
            <div className='flex h-full bg-gray-400'>
                <h1 className='text-2xl m-auto'>
                    Inhalt
                    <div>
                        {isLoading ? (
                            <div>Loading...</div>
                        ) : isAuthenticated ? (
                            <div>
                                <div>Logged in as {userId}</div>
                                <div>Room ID: {roomId}</div>
                            </div>
                        ) : (
                            <div>Not logged in</div>
                        )}
                    </div>
                </h1>
            </div>
            <QrCode isOpen={isQROpen} onClose={() => setQROpen(false)} title={`Join ID: ${roomId}`} link={href} />
        </div>
    );
};

export default Page;
