import Header from "../components/Header";


type TProps = {
  onShowCart: (isShow: boolean) => () => void
}

export default function({onShowCart} : TProps) {

  return(
    <Header onShowCart={onShowCart} />
  )
}