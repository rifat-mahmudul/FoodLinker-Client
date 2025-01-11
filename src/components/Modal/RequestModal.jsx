import { useMutation } from '@tanstack/react-query';
import PropTypes from 'prop-types'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const RequestModal = ({ isOpen, onClose, food, user }) => {
    
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [notes, setNotes] = useState(food.additionalNotes || "");

    const {foodImage, foodName, pickupLocation, expireDate, donor,foodQuantity, _id : foodId} = food
    const requestDate = new Date().toLocaleString();
    

    const {mutateAsync} = useMutation({
        mutationFn : async foodData => {
            const {data} = await axiosSecure.patch(`/food/${foodId}`, foodData)
            return data;
        }
    })

    useEffect(() => {
        setNotes(food.additionalNotes || "");
    }, [food.additionalNotes]);

    const handleRequest = async (e) => {

        if(!user){
            return navigate('/login')
        }

        e.preventDefault();
        const foodData = {
            foodName,
            foodImage,
            foodQuantity,
            pickupLocation,
            status : 'Requested',
            requestDate,
            additionalNotes: notes,
            donor,
            expireDate,
            requestEmail : user?.email,
        }

        if(user?.email === donor?.email){
            return toast.error('You donated this food. Permission not allowed.');
        }

        try {
            await mutateAsync(foodData);
            toast.success('Request Submitted Successfully.');
            navigate('/my-food-request')
        } catch (error) {
            toast.error('Request failed. Please try again.', error)
        }
    }

    useEffect(() => {
                AOS.init();
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div data-aos="zoom-in-up"  data-aos-duration="1000" className="bg-gradient-to-t from-[#0C1725] to-[#0E272B] w-[90%] max-w-lg rounded-lg shadow-lg p-5 relative overflow-hidden">
                <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-400">Request Details</h2>

                <form onSubmit={handleRequest}>
                    <div className="space-y-3 max-h-[70vh] overflow-y-auto p-3">
                        <div>
                            <label className="font-semibold">Food Name:</label>
                            <p className="bg-inherit border border-blue-500 p-2 rounded cursor-not-allowed">{foodName}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Food Image:</label>
                            <img
                                src={foodImage}
                                alt={foodName}
                                className="w-full h-40 rounded object-cover"
                            />
                        </div>
                        <div>
                            <label className="font-semibold">Food ID:</label>
                            <p className="bg-inherit border border-blue-500 p-2 rounded cursor-not-allowed">{foodId}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Donator Email:</label>
                            <p className="bg-inherit border border-blue-500 p-2 rounded cursor-not-allowed">{donor?.email}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Donator Name:</label>
                            <p className="bg-inherit border border-blue-500 p-2 rounded cursor-not-allowed">{donor?.userName}</p>
                        </div>
                        <div>
                            <label className="font-semibold">My Email:</label>
                            <p className="bg-inherit border border-blue-500 p-2 rounded cursor-not-allowed">{user?.email}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Expire Date:</label>
                            <p className="bg-inherit border border-blue-500 p-2 rounded cursor-not-allowed">{new Date(expireDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Request Date:</label>
                            <p className="bg-inherit border border-blue-500 p-2 rounded cursor-not-allowed">{requestDate}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Pickup Location:</label>
                            <p className="bg-inherit border border-blue-500 p-2 rounded cursor-not-allowed">{pickupLocation}</p>
                        </div>
                        <div>
                            <label className="font-semibold">Additional Notes:</label>
                            <textarea
                                className="w-full p-2 rounded bg-inherit border border-blue-500"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-5 flex justify-between">
                        <button
                            type='submit'
                            className="bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                            Submit Request
                        </button>
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            onClick={onClose}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

RequestModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    food: PropTypes.shape({
        foodName: PropTypes.string.isRequired,
        foodQuantity: PropTypes.number,
        foodImage: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
        donor: PropTypes.shape({
            email: PropTypes.string.isRequired,
            userName: PropTypes.string.isRequired,
        }),
        pickupLocation: PropTypes.string.isRequired,
        expireDate: PropTypes.string.isRequired,
        additionalNotes: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
    }).isRequired,
};

export default RequestModal;
