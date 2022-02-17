import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { mainReducer } from './reducers/mainReducer'
import { filtersReducer } from './reducers/filtersReducer'


const rootReducer = combineReducers({
  mainReducer, filtersReducer
})

export const store = createStore(rootReducer, composeWithDevTools())


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch