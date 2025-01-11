import Title from "../Shared/Title"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"

const JoinTeam = () => {

    useEffect(() => {
                    AOS.init();
    }, []);
    
    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <section className="mb-16">
        
            <Title title={'Join Our Team'} description={'Please Provider Your Information'}></Title>

            <div data-aos="fade-up"  data-aos-duration="2000" className="shadow-xl rounded-lg w-[90%] lg:w-[900px] mx-auto mt-5">

                <form onSubmit={handleSubmit}>
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
                            className='w-full bg-inherit border focus:border-2 border-blue-500 focus:border-blue-500 focus:outline-0 p-3 rounded-md mt-2' 
                            placeholder="Enter your photo url"
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
                            className='w-full bg-inherit border focus:border-2 border-blue-500 focus:border-blue-500 focus:outline-0 p-3 rounded-md mt-2' 
                            placeholder="Enter Your Full Name"
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
                            className='w-full bg-inherit border focus:border-2 border-blue-500 focus:border-blue-500 focus:outline-0 p-3 rounded-md mt-2' 
                            placeholder="Enter Your Email"
                            />
                        </div>

                        {/* Donator Name */}
                        <div className='sm:w-[45%]'>
                            <label 
                            className='text-white font-semibold' 
                            htmlFor="additionalNotes">
                                Why You Join Our Team
                                <span className='text-red-500 text-2xl font-bold'>*</span>
                            </label>
                            <br></br>

                            <textarea 
                            className='w-full bg-inherit border focus:border-2 border-blue-500 focus:border-blue-500 focus:outline-0 p-3 rounded-md mt-2'
                            placeholder='Write description here...'
                            >

                            </textarea>
                            
                        </div>
                    </div>

                    <button
                    type="submit"
                    className='bg-gradient-to-r from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700 py-3 w-full mt-5 rounded-lg font-bold border border-gray-500 transition-[0.5s] disabled:cursor-not-allowed disabled:bg-blue-300'>
                        Submit
                    </button>
                </form>

            </div>

        </section>
    )
}

export default JoinTeam
