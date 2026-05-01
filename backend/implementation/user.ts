
import { PrismaClient, Prisma } from '@prisma/client'
import type { User } from '@prisma/client'
const prisma = new PrismaClient()
export async function generateUser(email_input: string): Promise<User> {
    const user_exists: User | null = await prisma.user.findUnique({
        where: {
            email: email_input,
        },
    })
    if (user_exists != null) {
        return user_exists;
    }
    else {
        const user = await prisma.user.create({
            data: {
                email: email_input,
                username: null,
                createdAt: new Date()
            },

        })
        return user;
    }
}

// can be implemented later.
export async function updateUserInfo(email_input: string): Promise<User | null> {
    return null;
}
export async function getUserInfo(email_input: string): Promise<User | null> {
    return await prisma.user.findUnique({
        where: {
            email: email_input,
        },
    })

}