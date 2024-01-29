"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const JoinRoomPage: React.FC = () => {
    const [roomName, setRoomName] = useState('');
    const router = useRouter();

    const handleJoinRoom = () => {
        if (!roomName) return;
        router.push(`/rooms?id=${roomName}`);
    };


    return (
        <div className='pl-24 '>
            <h1>Join Room</h1>
            <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room id"
            />
            <button onClick={handleJoinRoom}>Join Room</button>
            <p>OR</p>
            <button onClick={() => router.push("rooms/new")}>Create Room</button>
            <p className='text-xl'><a href="https://www.youtube.com/watch?v=KvUS_3fz3QE&list=PL_9VQhSm4-mr7qtfJWrtC9J_KrbmKrTOn&ab_channel=FullyworldWebTutorials"></a></p>
        </div>
    );
};

export default JoinRoomPage;
