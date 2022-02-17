


export type TAction = {
  type: string,
  payload: any
}

type TFilter = {
  [key: string]: string[]
}

type TReducer = {
  page?: number | undefined,
  text?: string | undefined,
  filters?: TFilter
}


const defaultState: TReducer = {
  page: 0,
  text: '',
  filters: {}
}


export function mainReducer(state = defaultState, action: TAction) {


  switch (action.type) {

    case ('CHANGE_ALL'):
      return { ...state, ...action.payload }
    case ('REMOVE_ALL'):
      return {}

    case ('CHANGE_PAGE'):
      return { ...state, ['page']: action.payload }
    case ('CHANGE_TEXT'):
      return { ...state, ['text']: action.payload }
    case ('CHANGE_FILTERS'):
      return { ...state, ['filters']: action.payload }

    default:
      return state
  }
}