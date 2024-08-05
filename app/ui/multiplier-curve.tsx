'use client';

import { endCurrentRound } from "@/app/lib/features/appStateSlice";
import { CategoryScale, Chart, ChartConfiguration, LinearScale, LineController, LineElement, PointElement, Title } from 'chart.js';
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useRoundInfo } from "../lib/hooks";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);


const DataSetSize = 100;
const expFn = (x: number) => 0.1 * Math.pow(2, x);

export const MultiplierCurve = () => {
    const dispatch = useDispatch();
    const [multiplier, setMultiplier] = useState(0);
    const chartRef = useRef<HTMLCanvasElement>(null);
    const [chartObject, setChartObject] = useState<Chart | null>(null);

    const roundInfo = useRoundInfo();

    useEffect(() => {
        if (!roundInfo.started) return;
        if (chartObject) chartObject.destroy();

        const step = roundInfo.targetMultiplier / DataSetSize;
        let newValue = 0;
        const data = [];

        while (newValue < roundInfo.targetMultiplier) {
            data.push({ x: newValue, y: expFn(newValue) });
            newValue += step;
        }
        data.push({ x: newValue, y: expFn(newValue) });

        const totalDuration = roundInfo.roundTime * 1000;
        const delayBetweenPoints = totalDuration / data.length;
        const previousY = (ctx: any) => ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(['y'], true).y;
        const animations = {
            x: {
                duration: delayBetweenPoints,
                from: NaN, // the point is initially skipped
                delay(ctx: any) {
                    if (ctx.type !== 'data' || ctx.xStarted) {
                        return 0;
                    }
                    ctx.xStarted = true;
                    return ctx.index * delayBetweenPoints;
                }
            },
            y: {
                duration: delayBetweenPoints,
                from: previousY,
                delay(ctx: any) {
                    if (ctx.type !== 'data' || ctx.yStarted) {
                        return 0;
                    }
                    ctx.yStarted = true;
                    return ctx.index * delayBetweenPoints;
                },
            }
        };

        const chartType = 'line';
        const config: ChartConfiguration = {
            type: chartType,
            data: {
                datasets: [{
                    borderColor: '#eb735b',
                    borderWidth: 5,
                    radius: 0,
                    data: data,
                }]
            },
            options: {
                animations,
                interaction: {
                    intersect: false
                },
                scales: {
                    x: {
                        type: 'linear',
                        grid: {
                            display: false,
                        }
                    },
                    y: {
                        display: false
                    }
                },
            }
        };
        const ctx = chartRef.current?.getContext('2d');

        const multChart = ctx ? new Chart(ctx, config) : null;
        setChartObject(multChart);


        newValue = 0;
        const intervalId = setInterval(() => {
            newValue += step;
            if (newValue >= roundInfo.targetMultiplier) {
                clearInterval(intervalId);
                setMultiplier(roundInfo.targetMultiplier);
                dispatch(endCurrentRound());
            }
            setMultiplier(newValue);
        }, roundInfo.roundTime * 1000 / DataSetSize);
        return () => {
            clearInterval(intervalId);
        }
    }, [roundInfo.started]);

    return (
        <div className="bg-color-secondary border border-gray-500 rounded-md relative" >
            <div className={
                clsx("flex justify-center text-6xl font-extrabold absolute left-1/2 right-1/2 top-12 tracking-wide",
                    { 'color-primary': !roundInfo.started && roundInfo.roundNo > 1 }
                )}>
                {multiplier.toFixed(2)}x
            </div>
            <canvas className="w-full pt-10 min-h-[28.75rem]" id="multCurve" ref={chartRef}> </canvas>
        </div >
    )
}