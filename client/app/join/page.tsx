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

    const handleJoinRoom = () => {
        if (!roomNameField) return;
        if (validateRoomId(roomNameField)) {
            router.push(`/rooms?id=${roomNameField}`);
        } else {
            alert("Invalid Room ID");
        }
    };

    const handleCreateRoom = () => {
        const newRoomId = generateRoomId();
        register(newRoomId, true)
        router.push(`/rooms?id=${roomNameField}`);
    };

    return (
        <div className='m-auto'>
            <fieldset disabled={isAuthenticated} className='flex flex-col items-center gap-2 w-52 border-2 p-4 disabled:opacity-60'>
                <h1 className='text-2xl'>Join Room</h1>
                <input
                    type="text"
                    value={roomNameField}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Enter room id"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleJoinRoom() }}
                />
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
