import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

function AuthGuard() {
    const { token } = useAuthStore();

    const isAuthenticated = token && token.access_token !== ""

    return isAuthenticated ? (
        <Outlet />
    ) : (
        <Navigate to={"/"} replace />
    )
}
export default AuthGuard