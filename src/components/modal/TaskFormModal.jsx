/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setShowTaskFormModal } from '../../redux/actions';
import { initialData } from '../../redux/reducers/allReducers';

export default function TaskFormModal(props) {
  const { ModalPopup } = useSelector((state)=>state?.allReducers);
  const [formData, setFormData] = useState({title:'', description:""})
  const [error, setError] = useState({title:'', description:""})
  useEffect(()=>{
    CloseModal();
  },[])
    const dispatch = useDispatch();
    const clearState = () =>{
        setFormData({title:'', description:""})
        setError({title:'', description:""})
    }
    function CloseModal (){
        if(ModalPopup?.callBackCancel){
            ModalPopup?.callBackCancel();
        }
        clearData();
    }
    const clearData = () =>{
        dispatch(setShowTaskFormModal(initialData?.ModalPopup))
        clearState();
    }
    const onShow = () =>{
        if(ModalPopup?.data){
            setFormData((formData)=>({
                ...formData,
                ...ModalPopup?.data
            }))
        }
    }
    const onChangeHandler = (e) =>{
        setFormData((formData)=>({
            ...formData,
            [e.target.name]:e.target.value
        }))
        setError((error)=>({
            ...error,
            [e.target.name]:""
        }))
    }
    const validation = () =>{
        let value = true;
        if(formData?.title === ""){
            error.title = "Then field Title is required";
            value = false
        }
        if(formData?.description === ""){
            error.description = "Then field Description is required";
            value = false
        }
        setError((error1)=>({...error1, ...error}));
        return value;
    }
    const callFormSubmission = async () =>{
        if(validation()){
            if(ModalPopup?.callBackModal){
                await ModalPopup?.callBackModal(formData);
            }
            clearData()
        }
    }
    const onSubmit = (e) =>{
        e.preventDefault();
        callFormSubmission();
    }
  return (
    <Modal centered={true} onShow={onShow} onHide={CloseModal} show={ModalPopup?.show} className={"task-form-modal"}>
      <Modal.Header>
        <Modal.Title>{ModalPopup?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
       <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="task.title">
                <Form.Label>Title</Form.Label>
                <Form.Control onChange={onChangeHandler} value={formData?.title} name='title' placeholder="Enter task title" />
                <span className='text-danger  text-sm'>{error?.title}</span>
            </Form.Group>
            <Form.Group className="mb-3" controlId="task.description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} name='description' placeholder='Enter task description' value={formData?.description} onChange={onChangeHandler} />
                <span className='text-danger text-sm'>{error?.description}</span>
            </Form.Group>
       </Form>
       </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={CloseModal}>Cancel</Button>
        <Button variant='primary' type='submit' onClick={onSubmit}>{ModalPopup?.saveButton}</Button>
      </Modal.Footer>
    </Modal>
  )
}
