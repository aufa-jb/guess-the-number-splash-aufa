'use client';
import { ChangeEvent, useState } from "react";
import { CaretDownIcon, CaretUpIcon } from "../../lib/svg-icon";

const regExp = /[+-]?([0-9]*[.])?[0-9]+/;

export function StepInput({ title, step, max, min, onUpdateValue, initValue }: { title: string, step: number, max: number, min: number, initValue: number, onUpdateValue: Function }) {
    const [value, setValue] = useState(initValue.toString());
    const [valueAsNum, setValueAsNum] = useState(initValue);

    const updateValue = (value: string) => {
        setValue(value);
        const num = Number(value) || 0;
        setValueAsNum(num);
        onUpdateValue(num);
    }

    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        if (inputValue && !regExp.test(inputValue)) return;
        updateValue(inputValue);
    }

    return (
        <div className="border border-gray-500 rounded-md bg-box-gradient p-1 w-full h-14">
            <div className="flex justify-center text-sm">{title}</div>
            <div className="flex">
                <button disabled={valueAsNum <= min} className="bg-color-primary rounded-md border border-gray-500 p-1 mx-1"
                    onClick={() => updateValue(Math.max(min, valueAsNum - step) + '')}>
                    <CaretDownIcon width={12} height={12} />
                </button>
                <input type="text" className="text-center outline-none bg-gray-950 rounded-md font-semibold px-2 w-full"
                    value={value} onChange={inputChangeHandler} />
                <button disabled={valueAsNum >= max} className="bg-color-primary rounded-md border border-gray-500 p-1 mx-1"
                    onClick={() => updateValue(Math.min(max, valueAsNum + step) + '')}>
                    <CaretUpIcon width={12} height={12} />
                </button>
            </div>
        </div>
    );
}
