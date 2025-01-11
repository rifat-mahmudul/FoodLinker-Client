import { useQuery } from "@tanstack/react-query";
import Title from "../components/Shared/Title"
import useAuth from "../hooks/useAuth"
import useAxiosSecure from "../hooks/useAxiosSecure";
import Container from "../components/Shared/Container";
import ManageTableRow from "../components/Table/ManageTableRow";
import HelmetTitle from "../components/Shared/HelmetTitle";
import noDataImg from '../assets/NoData.png';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"

const ManageFoods = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data : foods = [], refetch} = useQuery({
        queryKey  : ['manageFoods', user?.email],
        queryFn : async () => {
            const {data} = await axiosSecure(`/manage-foods/${user?.email}`)
            return data;
        }
    })

    useEffect(() => {
                AOS.init();
    }, []);

    return (
        <section>

            <HelmetTitle title='Manage My Foods'></HelmetTitle>

            <div className="mt-5 mb-10">
                <Title title='Manage My Foods'></Title>
            </div>

            <Container>

                <div>
                    {foods.length === 0 && (
                        <div className="flex items-center justify-center h-[60vh] mb-10">
                            <img className="h-96" src={noDataImg} alt="" />
                        </div>
                    )}
                </div> 

                {
                    foods.length > 0 &&
                    <div className="mb-16 bg-[#0000ff13] p-5 rounded-lg">

                        <div className="bg-[#0000ff0f] sm:p-5 rounded-lg ">
                            <div className="rounded-t-xl overflow-x-auto lg:overflow-hidden">
                                <table className="w-full rounded-lg">
                                    <thead data-aos="fade-right"  data-aos-duration="2000">
                                        <tr className="h-16 bg-sky-700 text-white text-center">
                                            <th>Serial No.</th>
                                            <th>Food Image</th>
                                            <th>Food Name</th>
                                            <th>Food Status</th>
                                            <th>Expire Date</th>
                                            <th>Food Quantity</th>
                                            <th>Pickup Location</th>
                                            <th>Update Food</th>
                                            <th>Delete Food</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        
                                        {
                                            foods.map((item , index) => 
                                                <ManageTableRow 
                                                key={item._id} 
                                                index={index}
                                                item={item}
                                                refetch={refetch}
                                            >

                                            </ManageTableRow>
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

export default ManageFoods
