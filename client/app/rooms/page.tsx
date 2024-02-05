"use client";

import React, { use, useEffect, useState, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import QrCode from '@/components/QrCode';
import { useUrl } from 'nextjs-current-url';

import { validateRoomId } from '@/utils/helpers';
import { useAuth } from '@/contexts/AuthContext'; // Import the AuthContext
import PackContainer from '@/components/PackContainer';
import { FaPlus } from 'react-icons/fa';

const Page = () => {
    const searchParams = useSearchParams();
    const page_roomId = searchParams.get("id");
    const [isQROpen, setQROpen] = useState(false);
    const { href } = useUrl() ?? { href: "" };
    const router = useRouter();
    const authContext = useAuth(); // Get the AuthContext values
    const { userId, roomId, isAuthenticated, isRoomOwner, isLoading, login, register } = authContext || {}; // Destructure the AuthContext values with a conditional check

    useEffect(() => {
        if (isLoading) return;
        if (!validateRoomId(page_roomId)) {
            console.error('Invalid room ID', page_roomId, "redirecting to /join");
            router.replace("/join");
        }
    }, [page_roomId, router, isLoading]);

    useEffect(() => {
        if (isLoading === undefined) {
            try {
                login();
            } catch (error) {
                console.error('Login failed', error);
            }
        } else {
            if (!roomId && page_roomId) {
                register(page_roomId, false);
            }
            console.log(page_roomId, roomId);
            if (page_roomId && roomId && page_roomId != roomId) {
                router.replace(`/rooms/?id=${roomId}`);
                alert('You are already in a room, leave the room to join another one.');
            }
        }
    }, [isLoading, router, login, register, page_roomId, roomId]);

    useEffect(() => {
        if (!isLoading)
            router.refresh();
    }, [isLoading, router]);

    return (

        <div className='flex flex-col gap-2 h-full w-full'>
            <QrCode isOpen={isQROpen} onClose={() => setQROpen(false)} title={`Join ID: ${roomId}`} link={href} />
            <div className='flex bg-blue-300 h-1/5'>
                <p className='text-center m-auto'>Room ID: {page_roomId}</p>
                <button
                    className='w-10 h-10 self-center m-7 rounded-md bg-white font-bold transition hover:scale-105 hover:opacity-80'
                    onClick={() => setQROpen(true)}
                >QR</button>
            </div>
            <div className='flex bg-gray-400'>
                <h1 className='text-2xl m-auto'>

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
            <div className="flex space-x-4">
                <PackContainer />
                <PackContainer />
                <PackContainer />
                <PackContainer />
                <FaPlus className='m-12 size-8' />
            </div>
        </div>
    );
};

export default Page;
