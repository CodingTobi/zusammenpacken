import { nanoid } from "nanoid";

const minRoomIdLength = 10;
const maxRoomIdLength = 16;

export function validateRoomId(roomId:string | string[] | undefined) {
    /*checks if the room id is a string, is not empty, and is between 32 and 36 characters long*/

    if (roomId && typeof roomId === 'string' && roomId != "" && roomId.length <= maxRoomIdLength && roomId.length >= minRoomIdLength) {
        return true;
    } else {
        return false;
    }
}

export function generateRoomId() {
    return nanoid().slice(0, minRoomIdLength);
}