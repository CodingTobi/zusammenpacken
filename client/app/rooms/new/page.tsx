import { generateRoomId } from "@/utils/helpers";
import Link from "next/link";
import React from "react";

interface NewRoomProps {

}

const NewRoom: React.FC<NewRoomProps> = () => {
    return (<div>
        <p>New Room</p>
        <Link
            className="m-3 p-2 w-fit rounded-full bg-green-500 transition hover:opacity-80 hover:scale-105"
            href={(`/rooms?id=${generateRoomId()}`)}>Create New Room</Link>
    </div>);
}

export default NewRoom;