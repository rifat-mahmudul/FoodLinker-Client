import { NavLink } from "react-router"
import PropTypes from 'prop-types'

const NavItem = ({address, navName, setIsOpen}) => {
    return (
        <NavLink
            onClick={() => {setIsOpen(false)}}
            className={({isActive}) => (isActive ? 'hover:text-blue-500 border-b' : 'hover:text-blue-500')}
            to={address}
            >
            {navName}
        </NavLink>
    )
}

NavItem.propTypes = {
    address: PropTypes.string,
    navName: PropTypes.string,
    setIsOpen: PropTypes.func
}

export default NavItem
