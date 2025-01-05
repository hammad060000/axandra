import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Users from './Users'
import Dashboard from './Dashboard'
import Messages from './Messages'
import ProjectDetail from './ProjectDetail'

const App = () => {
  return (
   <>
   <Router>
   <Routes>
    <Route path="/" element={<Users/>}/>
    <Route path="/admin/pass=wrongpass@"element={<Dashboard/>}/>
    <Route path="/admin/pass=wrongpass@/messages"element={<Messages/>}/>
    <Route path= '/project/:id' element={<ProjectDetail />} />
   </Routes>
   </Router>
   </>
  )
}

export default App