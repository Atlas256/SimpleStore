import { useEffect, useMemo, useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import { Dispatch } from "redux";
import Search from "../components/Search";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { TAction } from "../store/reducers/mainReducer";






const handlerClickSend = (text: string, dispatch: Dispatch<TAction>, navigate: NavigateFunction) => () => {
  dispatch({ type: "CHANGE_TEXT", payload: text })
  navigate('/products/')
}

const handlerChangeInput = (setText: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<any>) => {
  const text = event.target.value;
  setText(text)
}



export default function () {

  const location = useLocation().pathname
  const navigate = useNavigate()


  const { text } = useAppSelector(store => store.mainReducer)
  const dispatch = useAppDispatch()

  const [textValue, setText] = useState<string>('')


  useEffect(() => {
    if (location === '/') {
      setText('')
    } else {
      setText(text)
    }
  }, [text, location])


  const onChangeInput = handlerChangeInput(setText)
  const onClickSend = handlerClickSend(textValue, dispatch, navigate)

  return (
    <Search text={textValue} onChangeInput={onChangeInput} onClickSend={onClickSend} />
  )
}