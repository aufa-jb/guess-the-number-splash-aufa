'use client';
import { useState } from "react"
import { ChatIcon } from "../lib/svg-icon";
import { useDispatch } from "react-redux";
import { useChatMsgs, useIsLoggedIn, useUser } from "../lib/hooks";
import { sendMsg } from "../lib/features/appStateSlice";
import clsx from "clsx";

export const ChatBox = () => {
    const [msg, setMsg] = useState('');
    const dispatch = useDispatch();
    const user = useUser();
    const chatMsgs = useChatMsgs();
    const loggedin = useIsLoggedIn();

    const sendChatMsg = () => {
        if (!msg || !user || !loggedin) return;
        dispatch(sendMsg({ msg, user, time: new Date().getTime() }));
        setMsg('');
    }
    return (
        <div className="w-full">
            <div className='flex items-center mb-2'>
                <ChatIcon className='color-primary' />
                <span className='ms-2'> Chat </span>
            </div>
            <div className=" border border-gray-500 rounded-md flex flex-col justify-between">
                <div className="h-24 overflow-y-auto p-2">
                    {chatMsgs.map((msg, idx) =>
                        <div key={idx} className="mb-1">
                            <span className={clsx(idx % 2 ? 'color-primary' : 'color-secondary')}>
                                {msg.user.name}:
                            </span>
                            <span className={clsx('ms-2 rounded-md p-1 text-sm', idx % 2 ? 'bg-gray-500' : 'bg-gray-700')}>{msg.msg}</span>
                        </div>)}
                </div>
                <div className="flex gap-2 bg-color-secondary w-full p-2 justify-between">
                    <input type="text" className="bg-color-primary border-0 shadow-none rounded-md outline-none p-2 w-full"
                        value={msg} onChange={(event) => setMsg(event?.target.value)}
                        onKeyUp={(event) => event.key === 'Enter' && sendChatMsg()} />
                    <button className="bg-primary-gradient rounded-md p-2" onClick={sendChatMsg} disabled={!msg || !loggedin}>Send</button>
                </div>
            </div>
        </div>
    )
}