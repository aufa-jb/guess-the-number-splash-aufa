// import { AppState, User } from "./definitions"
// import { isNil } from 'lodash';

// const CURRENT_USER_ID = 1;
// const users: User[] = [
//     { id: 1, name: 'you', points: 100, score: 0, multiplier: 2.25 },
//     { id: 2, name: 'cpu1', points: 100, score: 0, multiplier: 5.25 },
//     { id: 3, name: 'cpu2', points: 100, score: 0, multiplier: 3.25 },
//     { id: 4, name: 'cpu3', points: 100, score: 0, multiplier: 7.25 },
//     { id: 5, name: 'cpu4', points: 100, score: 0, multiplier: 9.25 }
// ];

// export const appState: AppState = {
//     users,
//     targetMultiplier: 1,
//     speed: 1,
//     started: false,
//     roundNo: 0
// }

// export const getUsers = (): User[] => {
//     return appState.users;
// }

// export const updateUserScore = (id: number, score: number) => {
//     const idx = getUsers().findIndex(user => user.id === id);
//     if (idx === -1) return;
//     appState.users[idx].score = (appState.users[idx].score || 0) + score;
// }


// export const updateUser = (payload: Partial<User>) => {
//     const idx = getUsers().findIndex(user => user.id === payload?.id);
//     if (idx === -1) return;
//     appState.users[idx] = { ...appState.users[idx], ...payload };
//     payload.id && !isNil(payload.score) && updateUserScore(payload.id, payload.score);
// }


// export const updateSpeed = (speed: number) => {
//     appState.speed = speed;
// }

// export const getNewTargetMultiplier = () => {
//     appState.targetMultiplier = Number((Math.random() * 10).toFixed(2));
// }

// export const getCurrentUser = () => {
//     return appState.users.find(user => user.id === CURRENT_USER_ID);
// }

// export const startNewRound = () => {
//     appState.started = true;
//     appState.roundNo++;
// }

// export const endCurrentRound = () => {
//     appState.started = false;
// }