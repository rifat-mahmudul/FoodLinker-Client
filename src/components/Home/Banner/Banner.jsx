import Container from "../../Shared/Container"
import img1 from '../../../assets/food1.png'
import img2 from '../../../assets/food2.png'
import img3 from '../../../assets/food3.png'
import img4 from '../../../assets/food4.png'
import { Link } from "react-router"
import './banner.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards, Autoplay } from 'swiper/modules';
import './styles.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"

const Banner = () => {

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <section className="lg:h-[calc(100vh-74px)] bg-cover bg-center bg-no-repeat bg-[#0000ff0c] sm:flex items-center banner">
            <Container>
                
                <div className="sm:flex items-center justify-between text-white pt-4 lg:pt-0 text-center sm:text-left overflow-hidden relative">
                    <div data-aos="fade-right"  data-aos-duration="2000" className="sm:w-1/2">
                        <h1  className="text-5xl text-center sm:text-start font-bold mb-5 flex flex-col lg:flex-row gap-2">
                            <span>
                                Welcome
                            </span>
                            <span className="font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text bg-300% animate-gradient">FoodLinker</span>
                        </h1>
                        <p className="text-gray-300">FoodLinker makes it easy to share excess food and spread happiness. Let’s turn surplus into a sustainable solution. At FoodLinker, we believe that every meal has the power to make a difference. Our platform connects people with surplus food to those in need, creating a network where sharing sustains lives and strengthens communities. By bridging the gap between abundance and scarcity, we aim to reduce food waste and ensure that no one goes hungry.</p>
                        
                        <Link to='available-foods'>
                            <button className="bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 transition-[0.5s] font-semibold py-2 px-4 rounded-md mt-5">See Available Food</button>
                        </Link>
                    </div>

                    <div data-aos="fade-left"  data-aos-duration="2000">
                        <Swiper
                            effect={'cards'}
                            grabCursor={true}
                            loop = {Infinity}
                            autoplay={{
                                delay: 2000,
                                disableOnInteraction: false,
                            }}
                            modules={[EffectCards, Autoplay]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                            <div>
                                <img className="h-96" src={img1} alt="" />
                            </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div>
                                    <img className="h-96" src={img2} alt="" />
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div>
                                    <img className="h-96" src={img3} alt="" />
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div>
                                    <img className="h-96" src={img4} alt="" />
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                
            </Container>

            <div className="absolute h-72 w-72 rounded-full bg-gradient-to-tr from-[#0000ff2b] to-[teal] top-0 left-0 animate-pulse blur-xl hidden lg:block"></div>
        </section>
    )
}

export default Banner
