import { useQuery } from "@tanstack/react-query"
import HelmetTitle from "../components/Shared/HelmetTitle"
import { useParams } from "react-router"
import { axiosSecure } from "../hooks/useAxiosSecure";
import Title from "../components/Shared/Title";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import RequestModal from "../components/Modal/RequestModal";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"

const FoodDetails = () => {

    const {id} = useParams();
    const {user} = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {data : food = {}} = useQuery({
        queryKey : ['food', id],
        queryFn : async () => {
            const {data} = await axiosSecure(`/food/${id}`)
            return data;
        }
    })

    const {foodImage, foodName, foodQuantity, pickupLocation, status, expireDate, additionalNotes, donor, _id} = food

    useEffect(() => {
                AOS.init();
    }, []);


    return (
        <section className="pb-16">

            <HelmetTitle title='Food Details'></HelmetTitle>

            <div className="mt-5 mb-10">
                    <Title title='Food Details'></Title>
            </div>

            <div className="w-[90%] xl:max-w-[1200px] mx-auto flex lg:flex-row flex-col items-start gap-10">

                <div data-aos="fade-right"  data-aos-duration="2000">
                    <div className="bg-[#0000ff24] w-[90%] sm:w-[600px] p-1 rounded-lg">
                        <img className="w-[90%] sm:w-[600px] h-[300px] mx-auto rounded-lg" src={foodImage} alt="" />
                    </div>
                    <p className="text-center text-sm mt-1 text-gray-300">Food Image</p>
                    <p className="mt-3 w-[90%] sm:w-[600px]"><span className="text-blue-400">Additional Information :</span> {additionalNotes}</p>
                </div>

                <div data-aos="fade-left"  data-aos-duration="2000">
                    <h1>Food ID : <span className="text-yellow-600">{_id}</span></h1>
                    <h1 className="mt-1 mb-1">Food Name : {foodName}</h1>
                    <h3>Food Quantity : {foodQuantity}</h3>
                    <h3>Pickup Location : {pickupLocation}</h3>
                    <p className="mt-3 mb-3">
                        Status : <span className="bg-[#0000ff38] text-blue-600 p-2 rounded-3xl font-bold">{status}</span>
                    </p>
                    <h3>Expire Date : {new Date(expireDate).toLocaleDateString()}</h3>

                    <h1 className="mt-3"><span className="text-green-400">Your Email :</span> {user?.email}</h1>

                    <div className="mt-3">
                        <h1 className="text-2xl text-yellow-600 font-semibold mb-2">Donar Info : </h1>
                        <div className="flex items-center gap-4">
                            <div>
                                <img className="h-12 w-12 rounded-full" src={donor?.photoURL} alt="" />
                            </div>
                            
                            <div>
                                <h1><span className="text-rose-500">Donator Name :</span> {donor?.userName}</h1>
                                <h1><span className="text-rose-500">Donator Email :</span> {donor?.email}</h1>
                            </div>
                        </div>
                    </div>

                    {/* modal button */}
                    <button
                    onClick={() => setIsModalOpen(true)}
                    className="text-blue-500 mt-5 font-bold border-b-2 border-blue-600 rounded-lg py-2 px-5 bg-[#80808038]"
                    >Request
                    </button>
                </div>

            </div>

            {/* modal components */}
            <RequestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                food={food}
                user={user}
            />

        </section>
    )
}

export default FoodDetails
