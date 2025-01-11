import PropTypes from 'prop-types'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"

const RequestTableRow = ({item, index}) => {

    const {foodImage, foodName, foodQuantity, pickupLocation, status, expireDate, requestDate, donor} = item;

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <tr data-aos="fade-left"  data-aos-duration="2000" className="text-center h-20 border-b border-gray-700 text-gray-400 font-semibold">
            <td>{index + 1}</td>
            <td>
                <img className="h-12 w-12 rounded-md mx-auto" src={foodImage} alt="" />
            </td>
            <td>{donor?.userName}</td>
            <td>{foodName}</td>
            <td>
                <span className={`${status === 'Available' ? 'bg-[#ffa6002f] text-orange-600' : 'bg-[#0000ff38] text-blue-600'} p-2 rounded-3xl font-bold`}>
                    {status}
                </span>
            </td>
            <td>{new Date(expireDate).toLocaleDateString()}</td>
            <td>{new Date(requestDate).toLocaleDateString()}</td>
            <td>{foodQuantity}</td>
            <td>{pickupLocation}</td>
        </tr>
    )
}

RequestTableRow.propTypes = {
    index : PropTypes.number,
    item : PropTypes.object,
    refetch : PropTypes.func
}

export default RequestTableRow
