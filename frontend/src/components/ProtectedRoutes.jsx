import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const PublicRoutes = ({children})=>{
    const isAuthenticated = useSelector(state=>state.auth.authenticated)
    if(isAuthenticated){
        <Navigate to={"/"}/>
    }else{
        return children
    }
}