import { cookies } from "next/headers";
import { createHash } from "crypto";
import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
    const session = await getSession();

    if (!session) {
        return null;
    }

    if (session.expiresAt < new Date()) {
        await prisma.session.delete({
            where: {
                id: session.id
            }
        });

        return null;
    }

    return session.user;
}

export async function getSession() {
    const cookieStore = await cookies();
    const rawToken = cookieStore.get("session_id")?.value;

    if (!rawToken) {
        return null;
    }

    const tokenHash = createHash("sha256")
        .update(rawToken)
        .digest("hex");

    const session = await prisma.session.findUnique({
        where: {
            tokenHash
        },
        include: {
            user: true
        }
    });

    return session;
}