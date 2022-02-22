export type TAction = {
  type: string,
  payload: any
}


const defaultState = {
  cartStore: {},
  cartProducts: [],
  totalPrice: 0,
}


export function cartReducer(state = defaultState, action: TAction) {


  switch (action.type) {

    case ('CHANGE_CART_STORE'):
      return { ...state, ['cartStore']: action.payload }

    case ('CHANGE_CART_PRODUCTS'):
      return { ...state, ['cartProducts']: action.payload }

    case ('CHANGE_TOTAL_PRICE'):
      return { ...state, ['totalPrice']: action.payload }

    default:
      return state
  }
}


