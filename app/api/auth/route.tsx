import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { nanoid } from 'nanoid';


function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('No secret');
    }
    return secret;
}

export async function POST(req: NextRequest) {
    // Prüfe, ob bereits ein gültiges Token existiert
    const token = req.cookies.get('token');
    const { searchParams } = new URL(req.nextUrl);
    const roomId = searchParams.get('roomId');

    try {
        if (token) {
            // Token vorhanden, validieren
            const decoded = jwt.verify(token.value, getSecret());
            if (typeof decoded === 'string' || decoded.roomId !== roomId) {
                throw new Error('Invalid token');
            }
            return new NextResponse(JSON.stringify({ success: true, userId: decoded.userId, roomId: decoded.roomId }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            // Kein Token, neues erstellen
            const userId = nanoid();
            const newToken = jwt.sign({ userId, roomId }, getSecret(), { expiresIn: '8h' });
            const response = new NextResponse(JSON.stringify({ success: true, userId, roomId }), {
                status: 200, // OK
                headers: {
                    'Content-Type': 'application/json',
                    'Set-Cookie': `token=${newToken}; Path=/; HttpOnly; Max-Age=${60 * 60 * 8},`, // 8h
                },
            });
            return response;
        }
    } catch (error) {
        // Bei Fehler (z.B. Token abgelaufen), neues Token erstellen
        console.error(error);
        throw new Error("Authentication failed1");
    }
}

export async function GET(req: NextRequest) {

    const token = req.cookies.get('token');
    // Verify the token
    try {
        if (!token) {
            throw new Error('No token');
        }
        const decoded = jwt.verify(token.value, getSecret());
        if (typeof decoded === 'string') {
            throw new Error('Invalid token');
        }
        return new NextResponse(JSON.stringify({ success: true, userId: decoded.userId, roomId: decoded.roomId }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        // Token is not valid or expired
        return new NextResponse(JSON.stringify({ success: false, message: 'Authentication failed2' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}