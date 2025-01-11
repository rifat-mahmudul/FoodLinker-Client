import {Link, useLocation, useNavigate} from 'react-router'
import logo from '../../../../assets/food1.png'
import NavItem from './NavItem'
import { useState } from 'react';
import { RiMenu3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import useAuth from '../../../../hooks/useAuth';
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const {user, logOut} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || '/'

    const handleLogout = () => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Logout!"
            }).then( async (result) => {
                if (result.isConfirmed) {
                    await logOut();
                    toast.success('Logout Successful');
                    navigate(from);
                }
            });
        } catch (error) {
            toast.error('Logout fail. Please try again.', error)
        }
    }

    const navItems = <>
        <NavItem setIsOpen={setIsOpen} address={'/'} navName='Home'></NavItem>
        <NavItem setIsOpen={setIsOpen} address={'/available-foods'} navName='Available Foods'></NavItem>
        <NavItem setIsOpen={setIsOpen} address={'/add-foods'} navName='Add Food'></NavItem>
        <NavItem setIsOpen={setIsOpen} address={'/manage-my-foods'} navName='Manage My Foods'></NavItem>
        <NavItem setIsOpen={setIsOpen} address={'/my-food-request'} navName='My Food Request'></NavItem>

        <li className='flex items-center space-x-4'>
            {
                user ?
                <div className='flex items-center gap-2'>
                    <div title={user?.displayName} className='h-10 w-10 rounded-full cursor-pointer'>
                        <img className='h-full w-full rounded-full' src={user?.photoURL} alt="" />
                    </div>

                    <button 
                    onClick={handleLogout}
                    className='bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 transition-[0.5s] font-semibold py-2 px-5 rounded-3xl'
                    >
                        Logout
                    </button>
                </div>
                : 
                <>
                    <Link to='/login'>
                    <button className='border border-gray-500 py-2 px-5 rounded-3xl hover:bg-blue-500'>Login</button>
                    </Link>

                    <Link to='/signUp'>
                        <button className='bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 transition-[0.5s] font-semibold py-2 px-5 rounded-3xl'>Signup</button>
                    </Link>
                </>
            }
        </li>
    </>

    return (
        <header className='bg-[#030922] py-4 font-semibold border-b border-gray-700 sticky top-0 z-50 backdrop-blur-lg'>
            <div className='flex justify-between items-center max-w-[90%] xl:max-w-[1200px] mx-auto '>
                <Link to='/'>
                    <div className='flex space-x-1 items-center'>
                        <img className='h-10' src={logo} alt="logo image" />
                        <h1 className='font-Rancho text-3xl'>FoodLinker</h1>
                    </div>
                </Link>

                <nav>
                    <ul className='xl:flex hidden items-center space-x-4'>
                        {navItems}
                    </ul>

                    <div>
                        <button onClick={() => setIsOpen(!isOpen)} className='xl:hidden block'>
                            {
                            isOpen 
                            ? 
                            <RxCross2 className='text-3xl' />
                            :
                            <RiMenu3Fill className='text-3xl' /> 
                            }
                        </button>

                        <ul className={`${isOpen ? 'block' : 'hidden'} xl:hidden absolute top-16 right-2 bg-[#0A1D2D] w-60 rounded-lg shadow-lg flex flex-col space-y-4 p-4 text-center`}>
                            {navItems}
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
