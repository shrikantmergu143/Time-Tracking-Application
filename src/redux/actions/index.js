
export const ActionTypes = {
    SET_INITIALIZE_STATE: "SET_INITIALIZE_STATE",
    SET_STORE_ADD_NEW_TASK_STATE:"SET_STORE_ADD_NEW_TASK_STATE",
    SET_STORE_EDIT_TASK_STATE:"SET_STORE_EDIT_TASK_STATE",
    SET_STORE_DELETE_TASK_STATE:"SET_STORE_DELETE_TASK_STATE",
    SET_SHOW_TASK_FORM_MODAL:"SET_SHOW_TASK_FORM_MODAL",
}
export const setStoreInitialize = (payload) =>{
    return{
        type:ActionTypes?.SET_INITIALIZE_STATE,
        payload:payload,
    }
}
export const setStoreAddNewTask = (payload) =>{
    return{
        type:ActionTypes?.SET_STORE_ADD_NEW_TASK_STATE,
        payload:payload,
    }
}
export const setStoreEditTask = (payload) =>{
    return{
        type:ActionTypes?.SET_STORE_EDIT_TASK_STATE,
        payload:payload,
    }
}
export const setStoreDeleteTask = (payload) =>{
    return{
        type:ActionTypes?.SET_STORE_DELETE_TASK_STATE,
        payload:payload,
    }
}
export const setShowTaskFormModal = (payload)=>{
    return{
        type:ActionTypes?.SET_SHOW_TASK_FORM_MODAL,
        payload:{
            ...payload,
            data:payload?.data?payload?.data:null
        },
    }
}