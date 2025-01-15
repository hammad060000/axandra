import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Users from './Users'
import Dashboard from './Dashboard'
import EditProject from './EditProject'
import Messages from './Messages'
import ProjectDetail from './ProjectDetail'
import AdminLogin from './AdminLogin'

const App = () => {
  return (
   <>
   <Router>
   <Routes>
    <Route path="/" element={<Users/>}/>
    <Route path="/admin"element={<AdminLogin/>}/>
    <Route path="/admin/project"element={<Dashboard/>}/>
    <Route path="/edit-project" element={<EditProject />} />
    <Route path="/admin/message"element={<Messages/>}/>
    <Route path= '/project/:id' element={<ProjectDetail />} />
   </Routes>
   </Router>
   </>
  )
}

export default App