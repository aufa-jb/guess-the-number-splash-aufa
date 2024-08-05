'use client';
import { useEffect, useState } from "react";
import { useIsLoggedIn, useUser } from "../lib/hooks";
import { PointsIcon, TimeIcon, UserIcon } from "../lib/svg-icon";

export function InfoBox() {
    const [currentTime, setCurrentTime] = useState('');
    const user = useUser();
    const loggedin = useIsLoggedIn();

    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
            const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            setCurrentTime(hour + ':' + minute);
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex justify-between w-full gap-2 mb-3 h-14">
            <div className="border border-gray-500 rounded-md bg-box-gradient p-1 w-full flex justify-between items-center px-2">
                <div><PointsIcon className="color-primary" width={24} height={24} /></div>
                <div>{loggedin ? user?.score : ''}</div>
                <div />
            </div>
            <div className="border border-gray-500 rounded-md bg-box-gradient p-1 w-full flex justify-between items-center px-2">
                <div><UserIcon className="color-primary" width={24} height={24} /></div>
                <div>{loggedin ? user?.name : ''}</div>
                <div />
            </div>
            <div className="border border-gray-500 rounded-md bg-box-gradient p-1 w-full flex justify-between items-center px-2">
                <div><TimeIcon className="color-primary" width={24} height={24} /></div>
                <div>{loggedin ? currentTime : ''}</div>
                <div />
            </div>
        </div>
    );
}
