import { TPropduct } from "../../types"





export type TAction = {
  type: string,
  payload: any
}


export type TCheckoutUserData = {
  name: string
}


const defaultState: {[key: string] : TCheckoutUserData | TPropduct[]} = {}


export function mainReducer(state = defaultState, action: TAction) {


  switch (action.type) {

    case ('CHANGE_ALL'):
      return { ...state, ...action.payload }

    default:
      return state
  }
}