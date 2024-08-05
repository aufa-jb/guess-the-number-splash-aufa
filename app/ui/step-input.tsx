'use client';
import { useState } from "react";
import { CaretDownIcon, CaretUpIcon } from "../lib/svg-icon";

export function StepInput({ title, step, max, min, onUpdateValue, initValue }: { title: string, step: number, max: number, min: number, initValue: number, onUpdateValue: Function }) {
    const [value, setValue] = useState<number>(initValue);

    const clickHandler = (value: number) => {
        setValue(value);
        onUpdateValue(value);
    }
    return (
        <div className="border border-gray-500 rounded-md bg-box-gradient p-1 w-full h-14">
            <div className="flex justify-center text-sm">{title}</div>
            <div className="flex">
                <button disabled={value <= min} className="bg-color-primary rounded-md border border-gray-500 p-1 mx-1"
                    onClick={() => clickHandler(Math.max(min, value - step))}>
                    <CaretDownIcon width={12} height={12} />
                </button>
                <div className="flex justify-center items-center bg-gray-950 rounded-md font-semibold px-2 w-full">{value}</div>
                <button disabled={value === max} className="bg-color-primary rounded-md border border-gray-500 p-1 mx-1"
                    onClick={() => clickHandler(value + step)}>
                    <CaretUpIcon width={12} height={12} />
                </button>
            </div>
        </div>
    );
}
