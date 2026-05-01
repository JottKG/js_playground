import { PrismaClient } from "@prisma/client";
import type { DailyLog } from "@prisma/client";
import type { EventBlock } from "../common/types.js";
import { jsonToEventBlockArray } from "../common/types.js";
const prisma = new PrismaClient();
export async function getDailyLog(userId: string, dateKey: Date): Promise<EventBlock[] | null> {
    dateKey = factorDate(dateKey);
    // format date key to be the days key
    const returnedDay: DailyLog | null = await prisma.dailyLog.findUnique({
        where: {
            userIdDateKey: { userId, dateKey }
        },
    });
    if (!returnedDay) { return null };
    return returnedDay.activities as unknown as EventBlock[];
    // return jsonToEventBlockArray(returnedDay.activities);
}

export async function setDailyLog(userId: string, dateKey: Date, data: EventBlock[]): Promise<EventBlock[] | null> {
    let dailyLog: EventBlock[] | null = await getDailyLog(userId, dateKey);
    if (dailyLog == null) {
        let currentdate = factorDate(dateKey);
        let newDay = await prisma.dailyLog.create(
            {
                data: {
                    userId: userId,
                    dateKey: currentdate,
                    activities: {}
                },

            });
        dailyLog = newDay.activities as unknown as EventBlock[];
    }
    let newDailyLog = await prisma.dailyLog.update({
        where: { userIdDateKey: { userId, dateKey } },
        data: { activities: JSON.parse(JSON.stringify(data)) },
    });
    return newDailyLog.activities as unknown as EventBlock[];

}
function factorDate(date: Date): Date {
    return new Date(Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        0, 0, 0, 0
    ));
}