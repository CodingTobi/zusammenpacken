import { useState, useEffect } from 'react'



export default function useUser() {
    const [data, setData] = useState<{ userId: string, roomId: string, success: boolean } | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        console.log(fetch('/api/auth', {method: "POST"}).then((res) => res.json()));
        fetch('/api/auth')
            .then((res) => res.json())
            .then((data) => {
                setData({
                    userId: data.userId,
                    roomId: data.roomId,
                    success: data.success
                });
                setLoading(false);
            });
    }, []);

    return { data, isLoading };
}