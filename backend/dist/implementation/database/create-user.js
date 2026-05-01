import { PrismaClient } from '@prisma/client';
import { UserDTO } from '../../common/dtos/userDTO.js';
const prisma = new PrismaClient();
export async function generateUser(email_input) {
    const user_exists = await prisma.user.findUnique({
        where: {
            email: email_input,
        },
    });
    if (user_exists != null) {
        return null;
    }
    else {
        const user = await prisma.user.create({
            data: {
                email: email_input,
                username: null,
                createdAt: new Date()
            },
        });
        return UserDTO.fromPrisma(user);
    }
}
//# sourceMappingURL=create-user.js.map