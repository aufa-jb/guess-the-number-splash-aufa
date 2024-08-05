'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './lib/store'
import { AppState } from './lib/definitions'
import { initState, initialState } from './lib/features/appStateSlice';

export default function StoreProvider({
    appState,
    children
}: {
    appState: AppState,
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>()
    if (!storeRef.current) {
        storeRef.current = makeStore()
        storeRef.current.dispatch(initState(appState))
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}


