/* eslint-disable */
import { uuid4 } from "../../components/utils/uuid4";
import { ActionTypes } from "../actions/index";

export const initialData = {
    task:[],
    ModalPopup:{
        title:"",
        show:false,
        data:null,
        callBackModal:()=>null,
        saveButton:""
    },
}

export const allReducers = (state = initialData, action) => {
    switch(action.type) {
        case ActionTypes?.SET_INITIALIZE_STATE:
            return{
                ...initialData
            }
        case ActionTypes?.SET_STORE_ADD_NEW_TASK_STATE:
            const old_task = state?.task;
            const payload = {
                ...action?.payload
            }
            payload.id = uuid4();
            old_task.push(payload)
            return{
                ...state,
                task:old_task
            }
        case ActionTypes?.SET_STORE_EDIT_TASK_STATE:
            const edit_task = state?.task?.map((item)=>{
                if(item?.id === action?.payload?.id){
                    return{
                        ...action?.payload
                    }
                }else{
                    return item;
                }
            });
            return{
                ...state,
                task:edit_task
            }
        case ActionTypes?.SET_STORE_DELETE_TASK_STATE:
            return{
                ...state,
                task:state?.task?.filter((item)=>item?.id!==action?.payload)
            }
        case ActionTypes?.SET_SHOW_TASK_FORM_MODAL:
            return{
                ...state,
                ModalPopup:action?.payload
            }
        default:
            return state;
    }
}