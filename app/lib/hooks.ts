import { useDispatch, useSelector, useStore } from 'react-redux'
import type { AppDispatch, AppStore, RootState } from './store'
import { AppState } from './definitions'
import { CURRENT_USER_ID } from './features/appStateSlice'
import { pick } from 'lodash'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export const useUser = () => useSelector((state: AppState) => state.users.find(user => user.id === CURRENT_USER_ID));
export const useAppUsers = () => useSelector((state: AppState) => state.users);
export const useIsLoggedIn = () => useSelector((state: AppState) => !!state.users.find(user => user.id === CURRENT_USER_ID)?.name);
export const useChatMsgs = () => useSelector((state: AppState) => state.chatMsgs);
export const useRoundInfo = () => useSelector((state: AppState) => pick(state, ['roundNo', 'targetMultiplier', 'roundTime', 'started']));

