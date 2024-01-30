"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { validateRoomId } from '@/utils/helpers'

const JoinRoomPage: React.FC = () => {
    const [roomName, setRoomName] = useState('');
    const router = useRouter();

    const handleJoinRoom = () => {
        if (!roomName) return;
        if (validateRoomId(roomName)) {
        router.push(`/rooms?id=${roomName}`);
        } else {
            alert("Invalid Room ID");
        }
    };


    return (
        <div className='pl-24 '>
            <h1>Join Room</h1>
            <input
                type="text"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                placeholder="Enter room id"
                onKeyDown={(e) => { if (e.key === 'Enter') handleJoinRoom() }}
            />
            <button onClick={handleJoinRoom}>Join Room</button>
            <p>OR</p>
            <button onClick={() => router.push("rooms/new")}>Create Room</button>
            <p className='text-xl'><a href="https://www.youtube.com/watch?v=KvUS_3fz3QE&list=PL_9VQhSm4-mr7qtfJWrtC9J_KrbmKrTOn&ab_channel=FullyworldWebTutorials"></a></p>
        </div>
    );
};

export default JoinRoomPage;
