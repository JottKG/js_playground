
import { PrismaClient, Prisma } from '@prisma/client'
import type { Module, UserModules } from '@prisma/client'
const prisma = new PrismaClient()

export async function enableModule(user_id: string, module_id: string): Promise<UserModules | null> {
    // get the current modules of this user
    const current_modules: UserModules | null = await prisma.userModules.findUnique({
        where: {
            userId: user_id,
        },
    });
    console.log("current modules:", current_modules)
    if (current_modules != null) {


        // looks something like { id1, id2.. } as a set
        // parse the json string as a json to get the current modules enabled by this user
        const user_enabled_modules =
            (current_modules?.modules as Record<string, boolean>) ?? {};
        // go look in the modules for the information of the selected module, see if it exists
        const selected_module: Module | null = await prisma.module.findUnique({
            where: {
                id: module_id,
            },
        });
        // if the module does not exist, return null
        if (selected_module == null) { return null; }
        // if the module is already in the enabled module json list, then just return the list
        if (module_id in user_enabled_modules) {
            return current_modules;
        }
        else {
            // else, we must add this module to the list and set it as the new value in the server
            const updated_modules = {
                ...user_enabled_modules,
                [module_id]: true
            };
            const saved: UserModules = await prisma.userModules.update({
                where: { userId: user_id },
                data: { modules: updated_modules },
            });
            return saved;
        }

    }
    else {
        const userModules: UserModules = await prisma.userModules.create({
            data: {
                userId: user_id,
                modules: { [module_id]: true },
            },
        })
        if (userModules) { return userModules };
        return null;
    }
}

export async function getModules(userId: string): Promise<UserModules | null> {

    return await prisma.userModules.findUnique({
        where: {
            userId: userId,
        },
    });
}