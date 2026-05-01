
import { PrismaClient, Prisma } from '@prisma/client'
import type { UserEvents } from '@prisma/client'
import type { Event as DbEvent } from "@prisma/client";
const prisma = new PrismaClient();
export async function addEvent(
    creatorId: string,
    name: string,
    color: string,
    notes: string,
): Promise<UserEvents | null> {
    // check if this exact event exists
    const event_exists: DbEvent | null = await prisma.event.findFirst({
        where: {
            creatorId: creatorId,
            name: name,
            color: color,
            notes: notes
        },
    });
    // if it does, return null
    if (event_exists != null) {
        return null;
    }

    // get the users events
    let currentUserEvents: UserEvents | null = await prisma.userEvents.findUnique({
        where: {
            userId: creatorId,
        },
    });
    // if a user has not defined events yet, create one
    if (currentUserEvents == null) {
        currentUserEvents = await prisma.userEvents.create({
            data: {
                userId: creatorId,
                eventIds: []
            },

        })
    }
    const currentCount = currentUserEvents?.eventIds.length ?? 0;
    // not allowing more than 100 events
    if (currentCount > 100) { return currentUserEvents };
    // create the event now

    let createdEvent: DbEvent | null = await prisma.event.create({
        data: {
            creatorId: creatorId,
            name: name,
            color: color,
            notes: notes,
            createdAt: new Date()
        },
    });
    // update and add this in the users events, you ain't getting with infinite events kid.
    const updatedUserEvents: UserEvents | null = await prisma.userEvents.update({
        where: { userId: creatorId },
        data: {
            eventIds: { push: createdEvent.id }
        },

    });
    return updatedUserEvents;

}

export async function getEvent(eventId: string): Promise<DbEvent | null> {
    const event_exists: DbEvent | null = await prisma.event.findUnique({
        where: {
            id: eventId
        },
    });
    // if it does, return null
    if (event_exists != null) {
        return null;
    }
    return event_exists;

}

export async function deleteEvent(eventId: string, userId: string): Promise<UserEvents | null> {
    const eventToDelete: DbEvent | null = await getEvent(eventId);
    if (eventToDelete?.creatorId != userId) { throw Error(); }
    //delete the event
    const deleted_event: DbEvent | null = await prisma.event.delete({
        where: { id: eventId }
    });
    if (deleted_event == null) { return null; }
    // remove it from the users event list
    // get the users events
    let currentUserEvents: UserEvents | null = await prisma.userEvents.findUnique({
        where: {
            userId: deleted_event.creatorId,
        },
    });
    if (!currentUserEvents) {
        throw new Error("UserEvents not found");
    }
    const newEventList = currentUserEvents?.eventIds.filter((id) => id !== eventId)
    const updatedUserEvents: UserEvents | null = await prisma.userEvents.update({
        where: { userId: deleted_event.creatorId },
        data: {
            eventIds: { set: newEventList },
        },
    });
    return updatedUserEvents;

}

export async function getUserEvents(userId: string): Promise<DbEvent[] | null> {
    let currentUserEvents: UserEvents | null = await prisma.userEvents.findUnique({
        where: {
            userId: userId,
        },
    });
    if (!currentUserEvents || currentUserEvents.eventIds.length === 0) return null;

    const events: DbEvent[] | null = await prisma.event.findMany({
        where: { id: { in: currentUserEvents.eventIds } },
        orderBy: { createdAt: "desc" },
    });

    return events;
}
