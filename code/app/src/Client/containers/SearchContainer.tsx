import { useEffect, useMemo, useState } from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import Search from "../components/Search";


const handlerClickSend = (text: string, location: string, navigate: NavigateFunction) => () => {
  if (!location.includes('products')) {
    navigate(`/products/text=${text}`)
  } else {
    navigate(`${location}text=${text}`)
  }
}

const handlerChangeInput = (setText: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<any>) => {

  const text = event.target.value;

  setText(text)
}




export default function () {

  const location = useLocation().pathname
  const navigate = useNavigate()

  const [text, setText] = useState<string>('')



  useEffect(() => {

    if (!location.includes('products')) {
      navigate(`/products/text=${text}`);
    } else {
      navigate(`${location}text=${text}`)
    }

  }, [text])



  const onClickSend = handlerClickSend(text, location, navigate)

  const onChangeInput = handlerChangeInput(setText)

  return (
    <Search text={text} onChangeInput={onChangeInput} onClickSend={onClickSend} />
  )
}