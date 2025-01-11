import { useQuery } from "@tanstack/react-query";
import Title from "../components/Shared/Title"
import useAuth from "../hooks/useAuth"
import useAxiosSecure from "../hooks/useAxiosSecure";
import Container from "../components/Shared/Container";
import HelmetTitle from "../components/Shared/HelmetTitle";
import RequestTableRow from "../components/Table/RequestTableRow";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"

const MyFoodRequest = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data : foods = [], refetch} = useQuery({
        queryKey  : ['requestFoods', user?.email],
        queryFn : async () => {
            const {data} = await axiosSecure(`/request-foods/${user?.email}`)
            return data;
        }
    })

    const requestedFoods = foods.filter((food) => food.status === 'Requested');

    useEffect(() => {
                AOS.init();
    }, []);

    return (
        <section>

            <HelmetTitle title='My Food Request'></HelmetTitle>

            <div className="mt-5 mb-10">
                <Title title='My Food Request'></Title>
            </div>

            <Container>

                <div>
                    {requestedFoods.length === 0 && (
                        <div className="flex items-center justify-center h-[60vh] mb-10">
                            <img className="h-96" src={"https://i.ibb.co.com/jzM8GWn/NoData.png"} alt="" />
                        </div>
                    )}
                </div> 

                {
                    requestedFoods.length > 0 &&
                    <div className="mb-16 bg-[#0000ff13] p-5 rounded-lg">

                        <div className="bg-[#0000ff0f] sm:p-5 rounded-lg ">
                            <div className="rounded-t-xl overflow-x-auto lg:overflow-hidden">
                                <table className="w-full rounded-lg">
                                    <thead data-aos="fade-right"  data-aos-duration="2000">
                                        <tr className="h-16 bg-sky-700 text-white text-center">
                                            <th>Serial No.</th>
                                            <th>Food Image</th>
                                            <th>Donar Name</th>
                                            <th>Food Name</th>
                                            <th>Food Status</th>
                                            <th>Expire Date</th>
                                            <th>Request Date</th>
                                            <th>Food Quantity</th>
                                            <th>Pickup Location</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        
                                        {
                                            requestedFoods.map((item , index) => 
                                                <RequestTableRow 
                                                key={item._id} 
                                                index={index}
                                                item={item}
                                                refetch={refetch}
                                            >

                                            </RequestTableRow>
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                }

            </Container>


        </section>
    )
}

export default MyFoodRequest
