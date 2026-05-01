import { Prisma } from "@prisma/client";



export interface EventBlock {
    startTime: number // 0-719
    endTime: number
    eventId: string
}

export function jsonToEventBlockArray(v: Prisma.JsonValue | null | undefined): EventBlock[] {
    if (!Array.isArray(v)) return [];

    const out: EventBlock[] = [];
    for (const x of v) {
        if (
            x &&
            typeof x === "object" &&
            typeof (x as any).startTime === "number" &&
            typeof (x as any).endTime === "number" &&
            typeof (x as any).eventId === "string"
        ) {
            out.push({
                startTime: (x as any).startTime,
                endTime: (x as any).endTime,
                eventId: (x as any).eventId,
            });
        } else {
            // If ANY item is invalid, treat the whole thing as invalid:
            return [];
        }
    }

    return out;
}