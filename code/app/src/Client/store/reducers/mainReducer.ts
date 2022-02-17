
export type TItem = {
  [key: string]: {type: string, value: string}
}

export type TAction = {
  type: string,
  payload: any
}




const defaultState: {[key: string]: string | number}  = {
  page: 1,
  text: ''
}



export function mainReducer(state = defaultState, action: TAction) {


  switch (action.type) {
    case ('CHANGE_TEXT'):
      return {...state, ['text']: action.payload}

    default:
      return state
  }

}