import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../hooks/useAuth"
import PropTypes from 'prop-types'

const PrivateRoutes = ({children}) => {

    const {user, loading} = useAuth();
    const location = useLocation();

    if(loading) return <LoadingSpinner></LoadingSpinner>

    if(user) return children

    return <Navigate to='/login' state={location.pathname} replace={true}></Navigate>
}

PrivateRoutes.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PrivateRoutes
