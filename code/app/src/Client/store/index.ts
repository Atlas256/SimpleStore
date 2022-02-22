import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { mainReducer } from './reducers/mainReducer'
import { cartReducer } from './reducers/cartReducer'
import { checkoutReducer } from './reducers/checkoutReducer'


const rootReducer = combineReducers({
  mainReducer, cartReducer, checkoutReducer
})

export const store = createStore(rootReducer, composeWithDevTools())


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch