"use client";

import { redirect } from "next/navigation";


const signOut = async () => {
    try {
        const response = await fetch('/api/auth/signout', {
            method: 'POST',
        });

        if (response.ok) {
            window.location.reload();
        } else {
            console.error('/utils/auth.tsx Failed to sign out.');
        }
    } catch (error) {
        console.error('/utils/auth.tsx An error occurred during sign out:', error);
    }
};

export { signOut };