export default function validateRoomId(roomId:string | string[] | undefined) {
    /*checks if the room id is a string, is not empty, and is between 32 and 36 characters long*/
    const minRoomIdLength = 32;
    const maxRoomIdLength = 36;
    if (roomId && typeof roomId === 'string' && roomId != "" && roomId.length <= maxRoomIdLength && roomId.length >= minRoomIdLength) {
        return true;
    } else {
        return false;
    }
}