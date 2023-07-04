/* eslint-disable eqeqeq */
import {useState, useEffect, useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowTaskFormModal, setStoreAddNewTask, setStoreDeleteTask, setStoreEditTask } from "../../redux/actions";
import { Button, Card, Container, Table } from "react-bootstrap";
import Edit from "./../../assets/image/Edit.svg";

function TimeTrackPage() {
  const dispatch = useDispatch();
  const { ModalPopup, task } = useSelector((state)=>state?.allReducers);

  // const [start, setStart] = useState(false);
  // const [pause, setPause] = useState(false);
  // const [sec, setSec] = useState(0);
  // const [timer, setTimer] = useState('')

  // useEffect(()=>{
  //   let timer = null;
  //   if(start & !pause){
  //     timer = setInterval(() => {
  //       setSec(sec=>sec+10);
  //     }, 10);
  //   }
  //   else if(pause){
  //     clearInterval(timer);
  //   }

  //   return ()=>{
  //     clearInterval(timer);
  //   }

  // },[start, pause]);

  // useEffect(()=>{
  //   const date = new Date(0);
  //   date.setSeconds(sec);

  //   setTimer(date.toISOString().slice(11,19));
  // })

  // const handleStart = () =>{
  //   setPause(false);
  //   setStart(true);
  // }
  // const handlePause = () =>{
  //   setStart(false);
  //   setPause(true);
  // }
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10); // Increment time by 10 milliseconds
      }, 10);
    }
  };

  // const stopTimer = () => {
  //   clearInterval(intervalRef.current);
  //   setTime(0);
  //   setIsRunning(false);
  // };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const saveTime = () =>{
    if(time != 0){
      pauseTimer()
      dispatch(setShowTaskFormModal({
        title:"Add Task",
        show:true,
        data:null,
        callBackModal:(data)=>callAddTask(data),
        callBackCancel:startTimer,
        saveButton:"Save Task"
      }))
    }
  }

  const callAddTask = (data) =>{
    dispatch(setStoreAddNewTask({...data, time_track:formatTime(time, true)}));
  }
  const formatTime = (time, data) => {
    const milliseconds = `0${Math.floor((time % 1000) / 10)}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / (1000 * 60)) % 60)}`.slice(-2);
    const hours = `0${Math.floor(time / (1000 * 60 * 60))}`.slice(-2);
    if(data){
      return `${hours}:${minutes}:${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };
  const callEditTaskDetails = (e, item) =>{
    dispatch(setShowTaskFormModal({
      title:"Add Task",
      show:true,
      data:item,
      callBackModal:(data)=>callEditTask(data, item),
      saveButton:"Save Task"
    }))
  }
  const callDeleteTaskDetails = (e, item) =>{
    dispatch(setStoreDeleteTask(item?.id));
  }
  const callEditTask = (data, item) =>{
    dispatch(setStoreEditTask({...data, id:item?.id}));
  }
  return (
    <div className="App">
      <div className="main-container">
        <Container className="mt-3">
         <div className="col-12 col-md-6 col-lg-4  mx-auto mb-3">
          <Card className=" time_card">
              <h5 className="text-title">Time Tracking Application <i className="common_icon Clock"/></h5>
              <Card.Body className="card-primary">
                <div className="timer-container">
                  <div className="timer-box">
                    <h1>{formatTime(time)}</h1>  
                  </div>
                </div>
                <div className="button-container">
                  <div className="button-box"> 
                    <Button className="start-btn" variant="success" onClick={startTimer} >Start</Button>
                    <Button className="pause-btn" variant="danger" onClick={pauseTimer}>Pause</Button>
                    <Button className="save-btn" onClick={saveTime}>Save</Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
         </div>
         <hr className="mb-0 mt-4"/>
         <section className="task-list">
            <Table  >
              <thead>
                <tr>
                  <th colSpan={4} align="center" className="text-center">Task List</th>
                </tr>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Time Tracking</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {task?.map((item, index)=>(
                  <tr key={index}>
                    <td>{item?.title}</td>
                    <td>{item?.description}</td>
                    <td>{item?.time_track}</td>
                    <td>
                      <Button className="icon_button" onClick={(e)=>callEditTaskDetails(e, item)}>
                        <i className="common_icon Edit"/>
                      </Button>
                      <Button className="icon_button" onClick={(e)=>callDeleteTaskDetails(e, item)}>
                        <i className="common_icon Delete"/>
                      </Button>
                    </td>
                  </tr>
                ))}
                {task?.length<=0&&(
                  <tr >
                    <td colSpan={4} align="center">No Task Found</td>
                  </tr>
                )}
              </tbody>
          </Table>
         </section>
        </Container>
      </div>
    </div>
  );
}

export default TimeTrackPage;
