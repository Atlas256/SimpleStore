import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { setTimeout } from "timers/promises";
import Search from "../components/Search";


const handlerClickSend = () => () => {


}

const handlerChangeInput = (setText: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<any>) => {

  const text = event.target.value;

  setText(text)
}



export default function () {

  let location = useLocation().pathname
  const navigate = useNavigate()

  const [text, setText] = useState<string>('')



  useMemo(() => {
      /*if (text) {
        navigate(`${location}text=${text}`)
      } else {
        navigate(location.slice(0, -2))
      }*/

      let regex = new RegExp(`text=${text}`, 'gi')

      location.replace(regex, '')
      navigate(`${location}text=${text}`)
  }, [text])




  const onChangeInput = handlerChangeInput(setText)

  return (
    <Search text={text} onChangeInput={onChangeInput} onClickSend={handlerClickSend} />
  )
}