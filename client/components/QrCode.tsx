"use client";

import React from 'react';
import { useQRCode } from 'next-qrcode';

interface QrCodeProps {
    isOpen: boolean;
    title: string;
    link: string;
    onClose: () => void;
}

export const QrCode: React.FC<QrCodeProps> = ({
    isOpen,
    title,
    link,
    onClose,
}) => {
    if (!isOpen) return null;
    const { SVG: QR_SVG } = useQRCode();

    // Function to handle outside click
    const handleOutsideClick = (event: any) => {
        if (event.target.id === 'overlay-background') {
            onClose(); // Call the onClose function
        }
    };

    const handleEscape = (event: any) => {
        if (event.key === 'Escape') {
            onClose();
        }
    };

    return (
        <dialog open className="fixed inset-0 z-50 p-2 bg-black" onClick={handleOutsideClick} onKeyDown={handleEscape}>
            <div id="overlay-background" className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div id="inner-element" className="inline-block w-1/3 min-w-52 p-6 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <p className='text-center'> {title} </p>
                {(link === null) ? (
                        <div className="flex items-center justify-center h-32">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                        </div>
                ) : (
                    <QR_SVG
                        text={link}
                        options={{
                            margin: 2,
                            color: {
                                dark: '#000000',
                                light: '#FFFFFF',
                            },
                        }}
                    />)}
            </div>
        </dialog>
    );
}

export default QrCode;