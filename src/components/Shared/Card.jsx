import { Link } from "react-router"
import PropTypes from 'prop-types'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"

const Card = ({food}) => {

    const {foodImage, foodName, foodQuantity, pickupLocation, status, expireDate, _id} = food

    useEffect(() => {
                AOS.init();
    }, []);

    return (
        <div data-aos="fade-up"  data-aos-duration="2000" className="shadow-xl border border-gray-600 rounded-lg transition font-semibold">
            <div>
                <img className="rounded-t-lg h-[250px] w-full" src={foodImage} alt="" />
            </div>

            <div className="bg-[#0A1022] px-3 pb-5 pt-2 rounded-b-lg">
                <div className="flex justify-between items-center pt-3 pb-2">
                    <h3 className="font-bold font-serif">{foodName}</h3>
                    <p>
                        Status : <span className="bg-[#0000ff38] text-blue-600 p-2 rounded-3xl font-bold">{status}</span>
                    </p>
                </div>

                <div className="flex justify-between items-center pt-3">
                    <h3>
                        Quantity : {foodQuantity}
                    </h3>

                    <h3>
                        Expire Date : {new Date(expireDate).toLocaleDateString()}
                    </h3>
                </div>

                <div className='flex justify-between items-center mt-5'>
                    <h3 className='flex gap-3 items-center'>
                        <span className="font-semibold">Location : {pickupLocation}</span>
                    </h3>

                    <Link to={`/foodDetails/${_id}`}>
                        <button className="text-blue-500 font-bold border-b-2 border-blue-600 rounded-lg py-2 px-5 bg-[#80808038]">
                            See Details
                        </button>
                    </Link>
                </div>

            </div>
        </div>

    )
}

Card.propTypes = {
    food: PropTypes.object,
}

export default Card
