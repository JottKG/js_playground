"use client"
import { List } from "postcss/lib/list";
import { useState, useEffect } from "react";


export type UserEvent = {
    id: string;
    creatorId: string;
    name: string;
    colour?: string | null;
    notes?: string | null;
    createdAt: Date;
};


export type EventBlock = {
    id: string;
    eventId: string;
    start: number; // minutes
    end: number; // minutes
};


interface DisplayProps {
    UserEvents: Record<string, UserEvent>,
    updateDailyLog: React.Dispatch<React.SetStateAction<EventBlock[]>>,
    DailyLog: EventBlock[]
}



function initializeRender(DailyLog: EventBlock[]): (string | null)[] {

    let dailyPixels: (string | null)[] = new Array(12 * 24).fill(null);
    // fill with null
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
    for (const log of DailyLog) {
        dailyPixels = updatePixels(dailyPixels, log);
    }
    return dailyPixels;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
function updatePixels(dailyPixels: (string | null)[], DailyLog: EventBlock): (string | null)[] {

    return dailyPixels.map((current, index) => { return (DailyLog.start <= index && index <= DailyLog.end) ? DailyLog.eventId : current })
}

function renderBoxes(boxes: (string | null)[], updateDailyLog: React.Dispatch<React.SetStateAction<EventBlock[]>>, UserEvents: Record<string, UserEvent>) {

    let renderedPixels = boxes.map((box) => { let colour = box ? UserEvents[box].colour : "#ffffff"; return <div className="h-4 w-4 border " style={{ backgroundColor: colour ?? "#732ebc" }} />; });
    console.log(boxes);
    //https://tailwindcss.com/docs/grid-template-columns
    return <div className="grid w-fit grid-cols-[repeat(12,1rem)]" >
        {renderedPixels}
    </div>


}


//https://tailwindcss.com/docs/grid-template-columns
// https://mui.com/material-ui/react-grid/
const DailyDisplay = ({
    UserEvents,
    updateDailyLog,
    DailyLog,
}: DisplayProps) => {
    // we will have 24 rows, for each hour of the day
    // we will have 12 columns, each for 5 minutes of each hour

    const [boxes, setBoxes] = useState<(string | null)[]>([])

    useEffect(() => {
        setBoxes(initializeRender(DailyLog));
    }, [DailyLog])
    return (
        renderBoxes(boxes, updateDailyLog, UserEvents)
    );
};



export default DailyDisplay;