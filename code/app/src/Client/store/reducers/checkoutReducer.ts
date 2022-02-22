export type TAction = {
  type: string,
  payload: any
}


export type TCheckoutUserData = {
  name: string,
  email: string,
  phone: string,
  deliveryAddress: string
}


const defaultState = {
  name: '',
  email: '',
  phone: '',
  deliveryAddress: ''
}


export function checkoutReducer(state = defaultState, action: TAction) {


  switch (action.type) {

    case ('CHANGE_CHECKOUT_DATA'):
      return { ...state, ...action.payload }

    default:
      return state
  }
}