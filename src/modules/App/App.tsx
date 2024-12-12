

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthGuard from '../Auth/guards/AuthGuard'
import Layout from './Layout'
import SignUp from '../Auth/SignUp'
import SignIn from '../Auth/SignIn'
import PrivateRoute from './Routes/Private/PrivateRoute'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout></Layout>}>
          <Route path="/" element={<Navigate to="sign-in" replace/> }></Route>

          <Route path="sign-in" element={<SignIn></SignIn>}/>
          <Route path='forgot-pass' element={<h2>forgot</h2>}></Route>
          <Route path='sign-up' element={<SignUp/>}></Route>

          <Route element ={<AuthGuard/>}>
            <Route path="private/*" element={<PrivateRoute/>}/>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
