import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Dispatch } from "redux";
import Search from "../components/Search";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { TAction } from "../store/reducers/mainReducer";






const handlerClickSend = (text: string, dispatch: Dispatch<TAction>) => () => {
  dispatch({ type: "CHANGE_TEXT", payload: text })
}

const handlerChangeInput = (setText: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<any>) => {
  const text = event.target.value;
  setText(text)
}



export default function () {

  const location = useLocation().pathname


  const mainReducer = useAppSelector(store => store.mainReducer)
  const dispatch = useAppDispatch()

  const [text, setText] = useState<string>('')


  useEffect(() => {
    if (location === '/') {
      setText('')
    } else {
      setText(mainReducer.text)
    }
  }, [mainReducer, location])




  const onChangeInput = handlerChangeInput(setText)
  const onClickSend = handlerClickSend(text, dispatch)

  return (
    <Search text={text} onChangeInput={onChangeInput} onClickSend={onClickSend} />
  )
}