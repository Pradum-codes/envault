import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(request) {
	try {
		const body = await request.json();
		console.log(body);
		const { username, password } = body;

		if (!username || !password) {
			return Response.json(
				{
					message: "Username and password are required",
				},
				{ status: 400 }
			);
		}

		if (password.length < 8) {
			return Response.json(
				{
					message: "Password must be at least 8 characters long",
				},
				{ status: 400 }
			);
		}

		const existingUser = await prisma.user.findUnique({
			where: {
				username,
			},
		});

		if (existingUser) {
			return Response.json(
				{
					message: "Username already exists",
				},
				{ status: 409 }
			);
		}

		const hashedPassword = await hash(password, 10);

		const user = await prisma.user.create({
			data: {
				username,
				password: hashedPassword,
			},
		});

		return Response.json(
			{
				message: "User created successfully",
				user: {
					id: user.id,
					username: user.username,
					createdAt: user.createdAt,
				},
			},
			{ status: 201 }
		);

		} catch (error) {
		console.error("User creation failed:", error);

		return Response.json(
			{
				message: "User creation failed",
			},
			{ status: 500 }
		);
	}
}
