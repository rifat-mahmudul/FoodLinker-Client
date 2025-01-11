import Container from "../Shared/Container"
import Title from "../Shared/Title"
import { FaFileCircleQuestion } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { AiOutlineSolution } from "react-icons/ai";
import { SiFuturelearn } from "react-icons/si";
import { IoCloudDone } from "react-icons/io5";
import { FaAccessibleIcon } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"

const OurMission = () => {

    useEffect(() => {
                AOS.init();
    }, []);
    

    return (
        <section className="mb-16 mt-8">
            
            <div className="mb-10">
                <Title title='Our Mission And Vision'></Title>
            </div>

            <Container>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 overflow-hidden">
                    
                    <div data-aos="fade-up"  data-aos-duration="2000" className="text-center bg-[#101829] p-5 rounded-xl cursor-pointer border border-gray-600 hover:scale-105 transition-[0.5s]">
                        <div>
                            <FaFileCircleQuestion className="mx-auto text-6xl text-rose-500" />
                        </div>
                        <h1 className="text-xl font-semibold mt-3 mb-3">What is the primary goal of FoodLinker?</h1>
                        <p className="text-gray-400">FoodLinker aims to connect individuals, businesses, and organizations to share surplus food, reduce waste, and support communities in need.</p>
                    </div>

                    <div data-aos="fade-down"  data-aos-duration="2000" className="text-center bg-[#101829] p-5 rounded-xl cursor-pointer border border-gray-600 hover:scale-105 transition-[0.5s]">
                        <div>
                            <FaPeopleGroup className="mx-auto text-6xl text-green-500" />
                        </div>
                        <h1 className="text-xl font-semibold mt-3 mb-3">Who does FoodLinker serve?</h1>
                        <p className="text-gray-400">FoodLinker serves anyone with surplus food and those in need, including individuals, families, food banks, and local organizations.</p>
                    </div>

                    <div data-aos="fade-left"  data-aos-duration="2000" className="text-center bg-[#101829] p-5 rounded-xl cursor-pointer border border-gray-600 hover:scale-105 transition-[0.5s]">
                        <div>
                            <AiOutlineSolution className="mx-auto text-6xl text-orange-500" />
                        </div>
                        <h1 className="text-xl font-semibold mt-3 mb-3">What problem does FoodLinker solve?</h1>
                        <p className="text-gray-400">FoodLinker addresses food waste and hunger by creating a seamless platform for sharing food, ensuring it reaches those who need it most.</p>
                    </div>

                    <div data-aos="fade-right"  data-aos-duration="2000" className="text-center bg-[#101829] p-5 rounded-xl cursor-pointer border border-gray-600 hover:scale-105 transition-[0.5s]">
                        <div>
                            <SiFuturelearn className="mx-auto text-6xl text-teal-500" />
                        </div>
                        <h1 className="text-xl font-semibold mt-3 mb-3">Where do we see FoodLinker in the future?</h1>
                        <p className="text-gray-400">In 5-10 years, FoodLinker envisions becoming a global leader in food-sharing, reducing waste and hunger through widespread community engagement.</p>
                    </div>

                    <div data-aos="fade-down"  data-aos-duration="2000" className="text-center bg-[#101829] p-5 rounded-xl cursor-pointer border border-gray-600 hover:scale-105 transition-[0.5s]">
                        <div>
                            <IoCloudDone className="mx-auto text-6xl text-blue-500" />
                        </div>
                        <h1 className="text-xl font-semibold mt-3 mb-3">What defines success for FoodLinker?</h1>
                        <p className="text-gray-400">Success is measured by the number of meals shared, food waste reduced, and the creation of a compassionate, sustainable food-sharing community.</p>
                    </div>

                    <div data-aos="fade-left"  data-aos-duration="2000" className="text-center bg-[#101829] p-5 rounded-xl cursor-pointer border border-gray-600 hover:scale-105 transition-[0.5s]">
                        <div>
                            <FaAccessibleIcon className="mx-auto text-6xl text-pink-500" />
                        </div>
                        <h1 className="text-xl font-semibold mt-3 mb-3">How will FoodLinker contribute to sustainability?</h1>
                        <p className="text-gray-400">FoodLinker will promote eco-conscious practices by reducing food waste, supporting sustainable food sourcing, and encouraging local, responsible sharing of resources.</p>
                    </div>

                </div>

            </Container>

        </section>
    )
}

export default OurMission
