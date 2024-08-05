export interface User {
    id: number;
    name: string;
    points: number;
    multiplier: number;
    score: number;

}

export interface ChatMsg {
    msg: string,
    user: User,
    time: number
}

export interface AppState {
    users: User[];
    targetMultiplier: number;
    speed: number;
    started: boolean;
    roundNo: number;
    roundTime: number;
    chatMsgs: ChatMsg[]
}

