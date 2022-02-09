import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userReducer } from './reducers/userReducer'


const rootReducer = combineReducers({
  userReducer
})

export const store = createStore(rootReducer, composeWithDevTools())


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch