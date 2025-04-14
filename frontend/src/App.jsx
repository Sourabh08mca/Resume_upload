import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ResumeUploadForm from './component/ResumeUploadForm'
import Table from './component/Table'



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ResumeUploadForm/>}></Route>
          <Route path='/table' element={<Table/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
