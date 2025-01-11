import { useForm } from "react-hook-form"
import DatePicker from "react-datepicker";
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {useMutation} from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router';
import { ImSpinner9 } from 'react-icons/im';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"

const AddFoodsForm = () => {

    const [startDate, setStartDate] = useState(new Date());
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {mutateAsync} = useMutation({
        mutationFn : async foodData => {
            const {data} = await axiosSecure.post('/foods', foodData)
            return data;
        }
    })

    const onSubmit = async data => {
        data.donor = {
            userName : user?.displayName,
            photoURL : user?.photoURL,
            email : user?.email
        }
        data.expireDate = startDate
        data.foodQuantity = Number(data.foodQuantity);
        
        try {
            await mutateAsync(data);
            navigate('/available-foods');
            toast.success('Food added successfully.');

        } catch (error) {
            toast.error('post failed. Please try again.', error);
        }
    }

        useEffect(() => {
                AOS.init();
        }, []);

    return (
        <div className="flex items-center justify-center min-h-screen">

            <div className='shadow-xl rounded-lg w-[90%] lg:w-[900px] p-8 bg-gradient-to-t from-[#0C1725] to-[#0E272B]'>
                <div data-aos="fade-down"  data-aos-duration="2000" className='flex items-center justify-center mb-2'>
                    <img className='h-10' src={"https://i.ibb.co.com/VMdncbV/food1.png"} alt="logo image" />
                    <h1 className='font-Rancho text-4xl'>FoodLinker</h1>
                </div>
                
                <div data-aos="fade-right"  data-aos-duration="2000">
                    <h1 className='font-bold text-blue-500 text-4xl text-center mb-6'>Add Food</h1>
                </div>

                <div>

                    <form data-aos="fade-right"  data-aos-duration="2000"  onSubmit={handleSubmit(onSubmit)}>

                        {/* food name and image */}
                        <div className='flex sm:flex-row flex-col gap-4 justify-between items-center'>
                            {/* food name */}
                            <div className='sm:w-[45%]'>
                                <label 
                                className='text-white font-semibold' 
                                htmlFor="name">
                                    Food Name 
                                    <span className='text-red-500 text-2xl font-bold'>*</span>
                                </label>
                                <br></br>

                                <input 
                                className='w-full bg-inherit border focus:border-2 border-blue-500 focus:border-blue-500 focus:outline-0 p-3 rounded-md mt-2' 
                                placeholder='Enter Food Name'
                                {
                                    ...register('foodName', {
                                        required : 'Food Name is Required'
                                    })
                                }
                                />

                                {
                                errors.foodName 
                                &&
                                <p className='text-red-500 text-sm mt-1'>{errors.foodName.message}</p> 
                                }
                            </div>

                            {/* food image */}
                            <div className='sm:w-[45%]'>
                                <label 
                                className='text-white font-semibold' 
                                htmlFor="foodImage">
                                    Food Image 
                                    <span className='text-red-500 text-2xl font-bold'>*</span>
                                </label>
                                <br></br>

                                <input 
                                className='w-full bg-inherit border focus:border-2 border-blue-500 focus:border-blue-500 focus:outline-0 p-3 rounded-md mt-2' 
                                placeholder='Enter Food Image URL'
                                {
                                    ...register('foodImage', {
                                        required : 'Food Image is Required'
                                    })
                                }
                                />

                                {
                                errors.foodImage 
                                &&
                                <p className='text-red-500 text-sm mt-1'>{errors.foodImage.message}</p> 
                                }
                            </div>
                        </div>

                        {/* food quantity and location */}
                        <div className='flex sm:flex-row flex-col gap-4 justify-between items-center mt-4'>
                            {/* food quantity */}
                            <div className='sm:w-[45%]'>
                                <label 
                                className='text-white font-semibold' 
                                htmlFor="foodQuantity">
                                    Food Quantity
                                    <span className='text-red-500 text-2xl font-bold'>*</span>
                                </label>
                                <br></br>

                                <input 
                                type='number'
                                className='w-full bg-inherit border focus:border-2 border-blue-500 focus:border-blue-500 focus:outline-0 p-3 rounded-md mt-2' 
                                placeholder='Enter Food Quantity'
                                {
                                    ...register('foodQuantity', {
                                        required : 'Food Quantity is Required'
                                    })
                                }
                                />
                                
                                {
                                errors.foodQuantity 
                                &&
                                <p className='text-red-500 text-sm mt-1'>{errors.foodQuantity.message}</p> 
                                }
                            </div>

                            {/* Pickup Location */}
                            <div className='sm:w-[45%]'>
                                <label 
                                className='text-white font-semibold' 
                                htmlFor="pickupLocation">
                                    Pickup Location
                                    <span className='text-red-500 text-2xl font-bold'>*</span>
                                </label>
                                <br></br>

                                <input 
                                className='w-full bg-inherit border focus:border-2 border-blue-500 focus:border-blue-500 focus:outline-0 p-3 rounded-md mt-2' 
                                placeholder='Enter Pickup Location'
                                {
                                    ...register('pickupLocation', {
                                        required : 'Pickup Location is Required'
                                    })
                                }
                                />

                                {
                                errors.pickupLocation 
                                &&
                                <p className='text-red-500 text-sm mt-1'>{errors.pickupLocation.message}</p> 
                                }
                            </div>
                        </div>

                        {/* expired Date and food status */}
                        <div className='flex sm:flex-row flex-col gap-4 justify-between items-center mt-4'>
                            {/* Expired DATe */}
                            <div className='sm:w-[45%]'>
                                <label 
                                className='text-white font-semibold' 
                                htmlFor="expiredDate">
                                    expired Date
                                    <span className='text-red-500 text-2xl font-bold'>*</span>
                                </label>
                                <br></br>

                                <DatePicker  
                                selected={startDate} 
                                onChange={(date) => setStartDate(date)} 
                                className='w-full bg-inherit border focus:border-2 border-blue-500 focus:border-blue-500 focus:outline-0 p-3 rounded-md mt-2'
                                />
                            </div>

                            {/* food status */}
                            <div className='sm:w-[45%]'>
                                <label 
                                className='text-white font-semibold' 
                                htmlFor="foodStatus">
                                    Food Status
                                    <span className='text-red-500 text-2xl font-bold'>*</span>
                                </label>
                                <br></br>

                                <input 
                                className='w-full bg-inherit border focus:border-2 border-blue-500 focus:border-blue-500 focus:outline-0 p-3 rounded-md mt-2' 
                                placeholder='Enter Food Status'
                                defaultValue='Available'
                                {...register('status')}
                                />
                            </div>
                        </div>

                        {/* Donator Image and Name */}
                        <div className='flex sm:flex-row flex-col gap-4 justify-between items-center mt-4'>
                            {/* Donator Image */}
                            <div className='sm:w-[45%]'>
                                <label 
                                className='text-white font-semibold' 
                                htmlFor="donatorImg">
                                    Donator Image
                                    <span className='text-red-500 text-2xl font-bold'>*</span>
                                </label>
                                <br></br>

                                <input 
                                defaultValue={user?.photoURL}
                                className='w-full bg-inherit border focus:border-2 border-blue-500 focus:border-blue-500 focus:outline-0 p-3 rounded-md mt-2' 
                                />
                            </div>

                            {/* Donator Name */}
                            <div className='sm:w-[45%]'>
                                <label 
                                className='text-white font-semibold' 
                                htmlFor="foodStatus">
                                    Donator Name
                                    <span className='text-red-500 text-2xl font-bold'>*</span>
                                </label>
                                <br></br>

                                <input 
                                defaultValue={user?.displayName}
                                className='w-full bg-inherit border focus:border-2 border-blue-500 focus:border-blue-500 focus:outline-0 p-3 rounded-md mt-2' 
                                />
                            </div>
                        </div>

                        {/* Donator Email and Additional Notes */}
                        <div className='flex sm:flex-row flex-col gap-4 justify-between items-center mt-4'>
                            {/* Donator Email */}
                            <div className='sm:w-[45%]'>
                                <label 
                                className='text-white font-semibold' 
                                htmlFor="donatorEmail">
                                    Donator Email
                                    <span className='text-red-500 text-2xl font-bold'>*</span>
                                </label>
                                <br></br>

                                <input 
                                defaultValue={user?.email}
                                className='w-full bg-inherit border focus:border-2 border-blue-500 focus:border-blue-500 focus:outline-0 p-3 rounded-md mt-2' 
                                />
                            </div>

                            {/* Donator Name */}
                            <div className='sm:w-[45%]'>
                                <label 
                                className='text-white font-semibold' 
                                htmlFor="additionalNotes">
                                    Additional Notes
                                    <span className='text-red-500 text-2xl font-bold'>*</span>
                                </label>
                                <br></br>

                                <textarea 
                                className='w-full bg-inherit border focus:border-2 border-blue-500 focus:border-blue-500 focus:outline-0 p-3 rounded-md mt-2'
                                placeholder='Enter Additional Notes...'
                                {
                                    ...register('additionalNotes', {
                                        required : 'Additional Notes is required'
                                    })
                                }
                                >

                                </textarea>
                                
                                {
                                errors.additionalNotes 
                                &&
                                <p className='text-red-500 text-sm mt-1'>{errors.additionalNotes.message}</p> 
                                }
                            </div>
                        </div>

                        <button
                        type="submit"
                        disabled={loading}
                        className='bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 py-3 w-full mt-5 rounded-lg font-bold border border-gray-500 transition-[0.5s] disabled:cursor-not-allowed disabled:bg-blue-300'>
                            {loading ? <ImSpinner9 className='animate-spin mx-auto text-2xl text-white' /> : 'Add Food'}
                        </button>

                    </form>

                </div>
            </div>

        </div>
    )
}

export default AddFoodsForm
