import { TFilter } from "../../containers/ProductsPage/SidebarContainer"

export type TItem = {
  [key: string]: {type: string, value: string}
}

export type TAction = {
  type: string,
  payload: any
}




const defaultState: TFilter  = {

}



export function filtersReducer(state = defaultState, action: TAction) {


  switch (action.type) {
    case ('CHANGE_FILTERS'):
      return {...state, ...action.payload}

    default:
      return state
  }
}