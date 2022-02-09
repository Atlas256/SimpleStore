import NavPanel from "../components/Nav";



export default function () {

  const BUTTONS: string[] = ['TYPES', 'TAGS', 'PRODUCTS', 'USERS', 'ORDERS', 'SETTINGS']

  return (
    <NavPanel BUTTONS={BUTTONS} />
  )
}