"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const JoinRoomPage: React.FC = () => {
    const [roomName, setRoomName] = useState('');
    const router = useRouter();

    const handleJoinRoom = () => {
        router.push(`/rooms?id=${roomName}`);
    };


    return (
        <div className='pl-24'>
            <h1>Join Room</h1>
            <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room name"
            />
            <button onClick={handleJoinRoom}>Join Room</button>
            <p>OR</p>
            <button onClick={() => router.push("/new")}>Create Room</button>
        </div>
    );
};

export default JoinRoomPage;
