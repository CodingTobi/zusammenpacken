"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { validateRoomId } from '@/utils/helpers'
import { useAuth } from '@/contexts/AuthContext';
import { generateRoomId } from '@/utils/helpers';
import { signOut } from '@/utils/auth';
import Button from '@/components/Button';

const JoinRoomPage: React.FC = () => {
    const [roomNameField, setRoomName] = useState('');
    const router = useRouter();
    const authContext = useAuth(); // Get the AuthContext values
    const { isAuthenticated, isLoading, register, roomId } = authContext || {}; // Destructure the AuthContext values with a conditional check
    const [errorText, setErrorText] = useState('');

    const handleJoinRoom = () => {
        if (!roomNameField) {
            setErrorText('Please Enter a room number')
            return;
        } else if (validateRoomId(roomNameField)) {
            router.push(`/rooms?id=${roomNameField}`);
        } else {
            setErrorText('Invalid room id');
        }
    };

    const handleCreateRoom = () => {
        const newRoomId = generateRoomId();
        register(newRoomId, true)
        router.push(`/rooms?id=${newRoomId}`);
    };

    return (
        <div className='mt-[20%] mx-auto'>
            <fieldset disabled={isAuthenticated} className='flex flex-col items-center gap-2 w-52 border-2 rounded-sm p-4 disabled:opacity-60'>
                <h1 className='text-2xl'>Join Room</h1>
                <input
                    className='rounded-md pl-1'
                    type="text"
                    value={roomNameField}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Enter room id"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleJoinRoom() }}
                    onFocus={() => setErrorText('')}
                />
                <div className="text-red-400 bg-black/10 px-0.5 rounded-md transition-all">{errorText}</div>
                <button
                    disabled={isAuthenticated}
                    className="disabled:pointer-events-none m-3 p-2 w-fit rounded-full bg-green-500 transition hover:opacity-80 hover:scale-105"
                    onClick={handleJoinRoom}>Join Room</button>
                <p>--------- OR---------</p>
                <button
                    disabled={isAuthenticated}
                    className="disabled:pointer-events-none m-3 p-2 w-fit rounded-full bg-green-500 transition hover:opacity-80 hover:scale-105"
                    onClick={handleCreateRoom}>Create New Room
                </button>
            </fieldset>
            {(isAuthenticated ?
                <div className='flex flex-col gap-2 m-4'>
                    <p className='text-center'>You are already logged in</p>

                    <div className='flex justify-evenly'>
                        <Button
                            className='bg-red-400'
                            onClick={signOut}>Sign out</Button>
                        <Button onClick={() => {router.push(`/rooms?id=${roomId}`)}}>got to room</Button>
                    </div>
                </div>
                : null)}
        </div>
    );
};

export default JoinRoomPage;
