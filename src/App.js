import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Users from './Users'
import EditProject from './EditProject'
import Messages from './Messages'
import ProjectDetail from './ProjectDetail'
import AdminLogin from './AdminLogin'
import Project from './Project'
import Categorys from './Categorys'
import AddProject from './AddProject'
import Reviews from './Reviews'


const App = () => {
  return (
   <>
   <Router>
   <Routes>
    <Route path="/" element={<Users/>}/>
    <Route path="/admin"element={<AdminLogin/>}/>
    <Route path="/admin/addproject"element={<AddProject/>}/>
    <Route path="/admin/review"element={<Reviews/>}/>
    <Route path="/admin/category"element={<Categorys/>}/>
    <Route path="/admin/project"element={<Project/>}/>
    <Route path="/editproject" element={<EditProject />} />
    <Route path="/admin/message"element={<Messages/>}/>
    <Route path= '/project/:id' element={<ProjectDetail />} />
   </Routes>
   </Router>
   </>
  )
}

export default App