import { useRoundInfo, useUser } from "@/app/lib/hooks";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { startNewRound, updateUser } from "../../lib/features/appStateSlice";
import { StepInput } from "../step-input";

export const UserInput = () => {
    const dispatch = useDispatch();
    const user = useUser();
    const roundInfo = useRoundInfo();

    const updatePoints = (value: number) => {
        dispatch(updateUser({ id: 1, points: value }));
    }

    const updateMultiplier = (value: number) => {
        dispatch(updateUser({ id: 1, multiplier: value }));
    }

    return (
        <>
            <div className="flex justify-between w-full gap-2 mb-3">
                <StepInput title="Points" step={50} max={user?.score || 0} min={1} initValue={Math.min(50, user?.score || 1)} onUpdateValue={updatePoints} />
                <StepInput title="Multiplier" step={0.25} max={10} min={1} initValue={1} onUpdateValue={updateMultiplier} />
            </div>
            <button
                className={
                    clsx('rounded-md w-full py-3 mb-4',
                        roundInfo.started ? 'bg-gray-500' : 'bg-primary-gradient'
                    )
                }
                onClick={() => dispatch(startNewRound())} disabled={roundInfo.started}>
                {roundInfo.started ? 'Started' : 'Start'}
            </button >
        </>
    )
}