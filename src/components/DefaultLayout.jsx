/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setStoreInitialize } from '../redux/actions';

export default function DefaultLayout(props) {
  const { ModalPopup, task } = useSelector((state)=>state?.allReducers);
  const dispatch = useDispatch();
  useEffect(()=>{
    callInitializeData();
  },[])
    
  const callInitializeData = () =>{
    if(!task || !ModalPopup){
        dispatch(setStoreInitialize());
    }
  }
  return (
    <main className='default-layout'>
      {props?.children}
    </main>
  )
}
