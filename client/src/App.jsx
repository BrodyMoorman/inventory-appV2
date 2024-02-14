import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Parts from './pages/Parts'
import Part from './pages/Part'
import Jobs from './pages/Jobs'
import Settings from './pages/Settings'
import NewJob from './pages/NewJob'
import Job from './pages/Job'
import Room from './pages/Room'
import RoomDesignerPage from './pages/RoomDesignerPage'

import { RequireAuth } from 'react-auth-kit'
import { Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'


function App() {
  const queryClient = new QueryClient()
  

  return (
    <QueryClientProvider client={queryClient}>
   <Routes>
      <Route path="/" element={<RequireAuth loginPath='/login'>
        <Home />
      </RequireAuth>} />
      <Route path="/parts" element={ <RequireAuth loginPath='/login'><Parts/></RequireAuth> }/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/parts/:partid" element={<RequireAuth loginPath='/login'><Part /></RequireAuth>} />
      <Route path="/jobs" element={<RequireAuth loginPath='/login'><Jobs /></RequireAuth>} />
      <Route path="/settings" element={<RequireAuth loginPath='/login'><Settings /></RequireAuth>} ></Route>
      <Route path="/jobs/new/" element={<RequireAuth loginPath='/login'><NewJob /></RequireAuth>} />
      <Route path="/jobs/new/:templateid" element={<RequireAuth loginPath='/login'><NewJob /></RequireAuth>} />
      <Route path="/jobs/:jobid" element={<RequireAuth loginPath='/login'><Job /></RequireAuth>} />
      <Route path="/room/:roomid" element={<RequireAuth loginPath='/login'><Room /></RequireAuth>} />
      <Route path="/roomdesigner/:roomid" element={<RequireAuth loginPath='/login'><RoomDesignerPage /></RequireAuth>} />
      
    </Routes>
    </QueryClientProvider>
  )
}

export default App
