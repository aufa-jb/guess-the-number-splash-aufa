'use client';

import { useState } from "react";
import style from './speed-slider.module.css';
import { useDispatch } from "react-redux";
import { updateSpeed } from "@/app/lib/features/appStateSlice";
import clsx from "clsx";
import { SpeedIcon } from "@/app/lib/svg-icon";

const MaxSpeed = 5;

export function SpeedSlider() {
    const [speed, setSpeed] = useState(1);
    const [bgSize, setBgSize] = useState(0);
    const dispatch = useDispatch();

    const valueChangeHandler = (event: any) => {
        const value = Number(event?.target?.value) || 1;
        setSpeed(value);
        setBgSize((value - 1) * Math.floor(100 / (MaxSpeed - 1)));
        dispatch(updateSpeed({ speed: value }));
    }
    return (
        <div>
            <div className="flex items-center mb-2">
                <SpeedIcon className="color-primary" />
                <span className="ms-2">Speed</span>
            </div>
            <div className="bg-color-secondary rounded-md border border-gray-500 p-2">
                <input className={style.slider} style={{ 'backgroundSize': bgSize + '%' }} type="range" step={1} min={1} max={MaxSpeed} value={speed} onChange={valueChangeHandler}></input>
                <div className="flex justify-between">{
                    Array(MaxSpeed).fill(0).map((_e, i) => <span key={i} className={clsx({ 'color-primary': speed >= (i + 1) })}>{1 + i + 'x'}</span>)
                }
                </div>
            </div >
        </div>
    );
}
