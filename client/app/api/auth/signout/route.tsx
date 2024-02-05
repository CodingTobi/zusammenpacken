import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    // Delete "token" cookie
    cookies().delete('token')
    return new Response("ok", { status: 200 })
}