import { Link } from "react-router";
import Card from "../../Shared/Card";
import Container from "../../Shared/Container";
import Title from "../../Shared/Title"
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"


const FeaturedFoods = () => {

    const axiosPublic = useAxiosPublic();

    const {data : foods = []} = useQuery({
        queryKey : ['foods'],
        queryFn : async () => {
            const {data} = await axiosPublic(`/foods`)
            return data;
        },
    })

    useEffect(() => {
                AOS.init();
    }, []);

    const availableFoods = foods.filter(food => food.status === "Available").sort((a, b) => b.foodQuantity - a.foodQuantity);

    return (
        <section className="pb-16 pt-24">
            
            <Container>

                <Title title="Available Foods" description='Here you can see the highest quantity of food'></Title>

                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10`}>
                    {
                    availableFoods.slice(0,6).map(food => <Card key={food._id} food={food}></Card>)
                    }
                </div>

                <div className="text-center mt-8">
                    <Link to='available-foods'>
                        <button data-aos="fade-up"  data-aos-duration="2000" className="py-3 px-5 bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 rounded-md font-bold">Show All Available Foods</button>
                    </Link>
                </div>

            </Container>

        </section>
    )
}

export default FeaturedFoods
