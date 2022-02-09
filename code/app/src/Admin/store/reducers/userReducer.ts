import axios from "axios"
import { useAppDispatch } from "../../hooks/redux"






export type TAction = {
  type: string,
  payload: any
}


const defaultState: any[] = []


export function userReducer(state = defaultState, action: TAction) {


  switch (action.type) {
    case ('SAVE'):
      return [...action.payload]

    default:
      return state
  }

}

