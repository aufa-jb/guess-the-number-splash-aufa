import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState, ChatMsg, User } from "../definitions";

export const CURRENT_USER_ID = 1;
const INITIAL_POINTS = 1000;
const INITIAL_ROUND_TIME = 10; // seconds

const users: User[] = [
    { id: 1, name: '', points: 50, score: INITIAL_POINTS, multiplier: 1 },
    { id: 2, name: 'cpu1', points: 50, score: INITIAL_POINTS, multiplier: 1 },
    { id: 3, name: 'cpu2', points: 50, score: INITIAL_POINTS, multiplier: 1 },
    { id: 4, name: 'cpu3', points: 50, score: INITIAL_POINTS, multiplier: 1 },
    { id: 5, name: 'cpu4', points: 50, score: INITIAL_POINTS, multiplier: 1 }
];

export const initialState: AppState = {
    users,
    targetMultiplier: 1,
    speed: 1,
    started: false,
    roundNo: 1,
    roundTime: INITIAL_ROUND_TIME,
    chatMsgs: []
}
export const appStateSlice = createSlice({
    name: 'appState',
    initialState,
    reducers: {
        initState: (state, action: PayloadAction<AppState>) => {
            state = action.payload;
        },
        updateUserScore: (state, action: PayloadAction<{ id: number, score: number }>) => {
            const idx = state.users.findIndex(user => user.id === action.payload.id);
            if (idx === -1) return;
            state.users[idx].score = (state.users[idx].score || 0) + action.payload.score;
        },
        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            const idx = state.users.findIndex(user => user.id === action.payload?.id);
            if (idx === -1) return;
            state.users[idx] = { ...state.users[idx], ...action.payload, score: state.users[idx].score };
        },
        updateSpeed: (state, action: PayloadAction<{ speed: number }>) => {
            state.speed = action.payload.speed;
            state.roundTime = INITIAL_ROUND_TIME / state.speed;
        },
        startNewRound: (state) => {
            state.started = true;
            state.targetMultiplier = Number((Math.random() * 9 + 1).toFixed(2));
            for (let user of state.users) {
                if (user.id === CURRENT_USER_ID) continue;
                const points = Math.ceil(Math.random() * user.score);
                const multiplierInt = Math.ceil(Math.random() * 9);
                const multiplierFloat = Math.floor(Math.random() * 4) * 0.25;
                const idx = state.users.findIndex(u => u.id === user.id);
                state.users[idx] = { ...user, points, multiplier: multiplierInt + multiplierFloat };
            }
        },
        endCurrentRound: (state) => {
            state.started = false;
            state.roundNo++;
            for (let i = 0; i < state.users.length; i++) {
                if (state.users[i].multiplier > state.targetMultiplier) {
                    state.users[i].score -= state.users[i].points;
                    state.users[i].score = Math.max(0, state.users[i].score);
                } else {
                    state.users[i].score += state.users[i].points * state.users[i].multiplier;
                }
            }
        },
        sendMsg: (state, action: PayloadAction<ChatMsg>) => {
            state.chatMsgs.push(action.payload);
        }
    },
});


export const { initState, updateUser, updateUserScore, updateSpeed, startNewRound, endCurrentRound, sendMsg } = appStateSlice.actions
export default appStateSlice.reducer;