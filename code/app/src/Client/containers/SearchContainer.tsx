import { useState } from "react";
import { Dispatch } from "redux";
import Search from "../components/Search";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { TAction } from "../store/reducers/mainReducer";





const handlerClickSend = (text: string, mainReducer: {[key: string]: string | number}, dispatch: Dispatch<TAction>) => () => {
  dispatch({ type: "CHANGE", payload: { ...mainReducer, ['text']: text } })
}

const handlerChangeInput = (setText: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<any>) => {
  const text = event.target.value;
  setText(text)
}



export default function () {

  const [text, setText] = useState<string>('')

  const mainReducer = useAppSelector(store => store.mainReducer)
  const dispatch = useAppDispatch()


  const onChangeInput = handlerChangeInput(setText)
  const onClickSend = handlerClickSend(text, mainReducer, dispatch)


  return (
    <Search text={text} onChangeInput={onChangeInput} onClickSend={onClickSend} />
  )
}