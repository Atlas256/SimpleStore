import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Search from "../components/Search";


const handlerClickSend = () => () => {


}

const handlerChangeInput = (setText: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<any>) => {

  const text = event.target.value;

  setText(text)
}



export default function () {

  const location = useLocation().pathname
  const navigate = useNavigate()

  const [text, setText] = useState<string>('')


  const onChangeInput = handlerChangeInput(setText)

  return (
    <Search text={text} onChangeInput={onChangeInput} onClickSend={handlerClickSend} />
  )
}