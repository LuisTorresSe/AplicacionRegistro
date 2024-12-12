import { Navigate, Route, Routes } from "react-router-dom"
import PrivateLayout from "./PrivateLayout"
import Profile from "./profile/Profile"

function PrivateRoute() {
  return (
    <Routes>
        <Route path="/" element={<PrivateLayout/>}>
            <Route
          path="/"
          index
          element={<Navigate to="profile" replace></Navigate>}
            />
            <Route path="profile" element={<Profile></Profile>}>

            </Route>
        
        </Route>
    </Routes>
  )
}
export default PrivateRoute