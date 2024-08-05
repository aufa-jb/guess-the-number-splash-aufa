'use client';
import clsx from "clsx";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../lib/features/appStateSlice";

export const Register = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');

    const acceptClickHandler = () => {
        console.log(username);
        dispatch(updateUser({ id: 1, name: username }));
    }

    return (
        <div className="flex flex-col justify-around items-center h-full rounded-md border border-gray-500 bg-color-secondary p-3">
            <div className="text-2xl">
                Welcome
            </div>
            <div>
                <div className="text-xs text-center mb-3 text-gray-500">Please Insert Your Name</div>
                <input className="w-full bg-color-primary border-0 shadow-none rounded-md outline-none p-3 mb-3"
                    value={username} onChange={(event: any) => setUsername(event.target.value)}
                    onKeyUp={(event) => event.key === 'Enter' && acceptClickHandler()} />
                <button
                    className={
                        clsx('rounded-md w-full py-3',
                            !username ? 'bg-gray-500' : 'bg-primary-gradient'
                        )
                    }
                    onClick={acceptClickHandler}
                    disabled={!username}>
                    Accept
                </button >
            </div >
        </div>
    )
}