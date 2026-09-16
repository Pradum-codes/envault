import { randomBytes, createHash } from "crypto";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";

export async function POST(request) {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
        return Response.json(
            { message: "Username and password are required" },
            { status: 400 }
        );
    }

    const existingUser = await prisma.user.findUnique({
        where: { username }
    });

    if (!existingUser) {
        return Response.json(
            { message: "Invalid username or password" },
            { status: 401 }
        );
    }

    const passwordIsValid = await compare(
        password,
        existingUser.password
    );

    if (!passwordIsValid) {
        return Response.json(
            { message: "Invalid username or password" },
            { status: 401 }
        );
    }

    const rawToken = randomBytes(32).toString("hex");

    const tokenHash = createHash("sha256")
        .update(rawToken)
        .digest("hex");

    await prisma.session.create({
        data: {
            userId: existingUser.id,
            tokenHash,
            expiresAt: new Date(Date.now() + 60 * 60 * 1000),
        },
    });

    return Response.json(
        { message: "Login successful" },
        {
            status: 200,
            headers: {
                "Set-Cookie":
                    `session_id=${rawToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600`
            }
        }
    );
}