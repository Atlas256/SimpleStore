import { Dispatch, useEffect, useState } from "react";
import ButtonsList from "../components/ButtonsList";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { TAction } from "../store/reducers/mainReducer";




const handlerOnClick = (dispatch: Dispatch<TAction | TAction>) => (number: number) => () => {
  dispatch({type: "CHANGE_PAGE", payload: number})
}

type TProps = {
  pagesCount: number
}


export default function({pagesCount}: TProps) {

  const { page } = useAppSelector(store => store.mainReducer)
  const dispatch = useAppDispatch()


  useEffect(() => {
    console.log(page);
  }, [page])


  const onClick = handlerOnClick(dispatch)

  return(
    <ButtonsList 
    pagesCount={pagesCount} 
    currentPage={page} 
    onClick={onClick}
    />
  )
}