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
    const body = await req.json();
    console.log('body', body);

    try {
        if (token) {
            // Token vorhanden, validieren
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
        } else {
            // Kein Token, neues erstellen
            const userId = nanoid();
            const newToken = jwt.sign({ userId: userId, roomId: body.roomId }, getSecret(), { expiresIn: '8h' });
            const response = new NextResponse(JSON.stringify({ success: true, userId:userId, roomId:body.roomId }), {
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
        throw new Error("POST: Authentication failed");
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
            throw new Error(`Invalid token (${decoded})`);
        }
        return new NextResponse(JSON.stringify({ success: true, userId: decoded.userId, roomId: decoded.roomId }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        // Token is not valid or expired
        return new NextResponse(JSON.stringify({ success: false, message: 'GET: Not logged in' }), {
            status: 401,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}