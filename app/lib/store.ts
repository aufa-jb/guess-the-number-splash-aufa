import { configureStore } from '@reduxjs/toolkit'
import { appStateSlice } from './features/appStateSlice'

export const makeStore = () => {
    return configureStore({
        reducer: appStateSlice.reducer,

    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']