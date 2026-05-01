
"use client"
import React from "react";
import DailyDisplay from "../components/dailyDisplay";
import { UserEvent } from "../components/dailyDisplay";
import { EventBlock } from "../components/dailyDisplay";
export default function Home() {

    const mockUserEvents: Record<string, UserEvent> = {
        sleep: {
            id: "sleep",
            creatorId: "user1",
            name: "Sleep",
            colour: "#9ca3af", // gray-400
            createdAt: new Date(),
        },
        focus: {
            id: "focus",
            creatorId: "user1",
            name: "Focus",
            colour: "#93c5fd", // blue-300
            createdAt: new Date(),
        },
        gaming: {
            id: "gaming",
            creatorId: "user1",
            name: "Gaming",
            colour: "#f87171", // red-400
            createdAt: new Date(),
        },
    };

    const mockDailyLog: EventBlock[] = [
        {
            id: "1",
            eventId: "sleep",
            start: 0,        // 00:00
            end: 95,         // ~08:00
        },
        {
            id: "2",
            eventId: "focus",
            start: 108,      // 09:00
            end: 180,        // ~15:00
        },
        {
            id: "3",
            eventId: "gaming",
            start: 200,
            end: 240,
        },
    ];
    const [DailyLog, setDailyLog] = React.useState<EventBlock[]>(mockDailyLog)

    const mockUpdateDailyLog: React.Dispatch<React.SetStateAction<EventBlock[]>> = () => [];
    return (
        <DailyDisplay
            UserEvents={mockUserEvents}
            DailyLog={DailyLog}
            updateDailyLog={setDailyLog}
        />
    );
}
