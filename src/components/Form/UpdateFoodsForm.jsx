import { useForm } from "react-hook-form"
import DatePicker from "react-datepicker";
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {useMutation, useQuery} from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router';
import { ImSpinner9 } from 'react-icons/im';
import PropTypes from 'prop-types';

const UpdateFoodsForm = ({id}) => {

    const [startDate, setStartDate] = useState(new Date());
    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {data : food = {}} = useQuery({
        queryKey : ['food', id],
        queryFn : async () => {
            const {data} = await axiosSecure(`/food/${id}`)
            return data;
        }
    })

    const {foodImage, foodName, foodQuantity, pickupLocation, additionalNotes,status} = food

    const {
        register,
        handleSubmit,
        setValue,
    } = useForm();

    const {mutateAsync} = useMutation({
        mutationFn : async foodData => {
            const {data} = await axiosSecure.patch(`/food/${id}`, foodData)
            return data;
        }
    })

    useEffect(() => {
        if (food) {
            setValue('foodName', food.foodName || '');
            setValue('foodImage', food.foodImage || '');
            setValue('foodQuantity', food.foodQuantity || '');
            setValue('pickupLocation', food.pickupLocation || '');
            setValue('status', food.status || '');
            setValue('additionalNotes', food.additionalNotes || '');
            if (food.expireDate) {
                setStartDate(new Date(food.expireDate));
            }
        }
    }, [food, setValue]);

    const onSubmit = async data => {
        data.donor = {
            userName : user?.displayName,
            photoURL : user?.photoURL,
            email : user?.email
        }
        data.expireDate = startDate
        data.foodQuantity = Number(data.foodQuantity);
        data.status = data.status || status;
        data.foodName = data.foodName || foodName;
        data.foodImage = data.foodImage || foodImage;
        data.foodQuantity = data.foodQuantity || foodQuantity;
        data.pickupLocation = data.pickupLocation || pickupLocation;
        data.additionalNotes = data.additionalNotes || additionalNotes;
        
        try {
            await mutateAsync(data);
            navigate('/available-foods');
            toast.success('Food Updated successfully.');

        } catch (error) {
            toast.error('post failed. Please try again.', error);
        }
    }

    useEffect(() => {
        if (food.expireDate) {
            setStartDate(new Date(food.expireDate));
        }
    }, [food.expireDate]); 

    return (
        <div className="flex items-center justify-center min-h-screen">

            <div className='shadow-xl rounded-lg w-[90%] lg:w-[900px] p-8 bg-gradient-to-t from-[#0C1725] to-[#0E272B]'>
                <div className='flex items-center justify-center mb-2'>
                    <img className='h-10' src={"https://i.ibb.co.com/VMdncbV/food1.png"} alt="logo image" />
                    <h1 className='font-Rancho text-4xl'>FoodLinker</h1>
                </div>
                
                <div>
                    <h1 className='font-bold text-blue-500 text-4xl text-center mb-6'>Update Food</h1>
                </div>

                <div>

                    <form onSubmit={handleSubmit(onSubmit)}>

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
                                {...register('foodName')}
                                />
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
                                    ...register('foodImage')
                                }
                                />
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
                                    ...register('foodQuantity')
                                }
                                />
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
                                    ...register('pickupLocation')
                                }
                                />
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
                                    ...register('additionalNotes')
                                }
                                >

                                </textarea>
                            </div>
                        </div>

                        <button
                        type="submit"
                        disabled={loading}
                        className='bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 py-3 w-full mt-5 rounded-lg font-bold border border-gray-500 transition-[0.5s] disabled:cursor-not-allowed disabled:bg-blue-300'>
                            {loading ? <ImSpinner9 className='animate-spin mx-auto text-2xl text-white' /> : 'Update Food'}
                        </button>

                    </form>

                </div>
            </div>

        </div>
    )
}

UpdateFoodsForm.propTypes = {
    id : PropTypes.string
}

export default UpdateFoodsForm;