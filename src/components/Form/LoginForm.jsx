import { Link, useLocation, useNavigate } from 'react-router'
import logo from '../../assets/food1.png'
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form"
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { ImSpinner9 } from 'react-icons/im';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const LoginForm = () => {

    const {signIn, googleLogin, loading} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state || '/'
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async data => {
        const {email, password} = data;
        try {
            await signIn(email, password)
            toast.success('Log In Successful');
            navigate(from);
        } catch (error) {
            toast.error(`error from sign Up ${error.message}`)
        }
    }

    const handleGoogle = async () => {
        try {
            await googleLogin()
            toast.success('Log In Successful');
            navigate(from);
        } catch (error) {
            toast.error('Google login failed. Please try again.');
            console.error('Google login error:', error);
        }
    }

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen">

            <div data-aos="fade-right"  data-aos-duration="2000" className='border border-gray-500 shadow-xl rounded-lg w-[90%] sm:w-[500px] p-8 bg-gradient-to-t from-[#0C1725] to-[#0E272B]'>
                <div className='flex items-center justify-center mb-2'>
                    <img className='h-10' src={logo} alt="logo image" />
                    <h1 className='font-Rancho text-4xl'>FoodLinker</h1>
                </div>
                
                <div>
                    <h1 className='font-bold text-blue-500 text-4xl text-center mb-6'>Login</h1>
                </div>

                <div>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className='mt-4'>
                            <label 
                            className='text-white font-semibold' 
                            htmlFor="email">
                                Email 
                                <span className='text-red-500 text-2xl font-bold'>*</span>
                            </label>
                            <br></br>

                            <input 
                            className='w-full bg-inherit border-b-2  border-gray-700 focus:border-blue-500 focus:outline-0' 
                            {...register("email",{
                                required : 'Email is required',
                                pattern : {
                                    value : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message : 'Invalid Email Address'
                                }
                            })}
                            />

                            {      
                            errors.email 
                            ? 
                            <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p> 
                            : 
                            <p className='text-gray-400 text-sm mt-1'>Enter Your Email Address.</p>
                            }
                        </div>

                        <div className='mt-4'>
                            <label 
                            className='text-white font-semibold' 
                            htmlFor="password">
                                Password 
                                <span className='text-red-500 text-2xl font-bold'>*</span>
                            </label>
                            <br></br>

                            <input 
                            className='w-full bg-inherit border-b-2  border-gray-700 focus:border-blue-500 focus:outline-0'
                            type={showPassword ? 'text' : 'password'}
                            {...register("password",
                                {
                                    required : 'Password is required',
                                    minLength : {
                                        value : 6,
                                        message : "Password must be at least 6 characters"
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                                        message: "Password must include uppercase and lowercase letters",
                                    },
                                }
                            )}
                            />

                            <button 
                            type="button"
                            className='absolute top-1/2 right-8 transform -translate-y-1/2 text-gray-400 hover:text-white'
                            onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                            </button>

                            {      
                            errors.password 
                            ? 
                            <p className='text-red-500 text-sm mt-1'>{errors.password.message}</p> 
                            : 
                            <p className='text-gray-400 text-sm mt-1'>Enter Your Password.</p>
                            }
                        </div>

                        <button 
                        disabled={loading}
                        className='bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 py-3 w-full mt-5 rounded-lg font-bold border border-gray-500 transition-[0.5s] disabled:cursor-not-allowed disabled:bg-blue-300'>
                            {loading ? <ImSpinner9 className='animate-spin mx-auto text-2xl text-white' /> : 'Login'}
                        </button>

                    </form>

                    <p className='text-sm mt-4 mb-4 sm:flex justify-center space-x-2 text-gray-300'>
                        <span>Do not have an account?</span>
                        <span className='text-green-500'>
                            <Link className='flex items-center space-x-1' to='/signUp'>
                            <span>Sign Up here!</span> <LuSquareArrowOutUpRight />
                        </Link>
                        </span>
                    </p>

                    <div className='flex items-center justify-center space-x-4 mt-4'>
                        <div className='border border-gray-300 w-full'></div>
                        <div>
                            <h1>Or</h1>
                        </div>
                        <div className='border border-gray-300 w-full'></div>
                    </div>

                    <button 
                    onClick={handleGoogle}
                    disabled={loading}
                    className='bg-black py-3 w-full mt-5 rounded-lg font-bold flex items-center justify-center space-x-2 disabled:cursor-pointer'
                    >
                        <FcGoogle className='text-3xl' /> <span>Continue With Google</span>
                    </button>

                </div>
            </div>

        </div>
    )
}

export default LoginForm