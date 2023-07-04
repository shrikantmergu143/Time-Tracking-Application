import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TimeTrackPage from './components/TimeTrack/TimeTrackPage'
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskFormModal from './components/modal/TaskFormModal';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  exact element={<TimeTrackPage />} />
      </Routes>
      <TaskFormModal/>
    </BrowserRouter>
  )
}
