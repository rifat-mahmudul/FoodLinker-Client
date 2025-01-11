import { FaPencil } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import PropTypes from 'prop-types'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";

const ManageTableRow = ({item, index, refetch}) => {

    const axiosSecure = useAxiosSecure();

    const {mutateAsync} = useMutation({
        mutationFn : async (foodID) => {
            const {data} = await axiosSecure.delete(`/food/${foodID}`)
            return data;
        }
    })

    const {foodImage, foodName, foodQuantity, pickupLocation, status, expireDate, _id : foodID} = item;

    const handleDeleteFood = () => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Delete!"
            }).then( async (result) => {
                if (result.isConfirmed) {
                    await mutateAsync(foodID);
                    toast.success('Food Deleted')
                    await refetch();
                }
            });
        } catch (error) {
            toast.error('Delete fail. Please try again.', error)
        }
    }

    return (
        <tr className="text-center h-20 border-b border-gray-700 text-gray-400 font-semibold">
            <td>{index + 1}</td>
            <td>
                <img className="h-12 w-12 rounded-md mx-auto" src={foodImage} alt="" />
            </td>
            <td>{foodName}</td>
            <td>
                <span className={`${status === 'Available' ? 'bg-[#ffa6002f] text-orange-600' : 'bg-[#0000ff38] text-blue-600'} p-2 rounded-3xl font-bold`}>
                    {status}
                </span>
            </td>
            <td>{new Date(expireDate).toLocaleDateString()}</td>
            <td>{foodQuantity}</td>
            <td>{pickupLocation}</td>
            <td>
                <Link to={`/update-food/${foodID}`}>
                    <button className="bg-[#ffa6002d] p-3 rounded-lg text-orange-500">
                        <FaPencil className="mx-auto text-xl" />
                    </button>
                </Link>
            </td>
            <td >
                <button 
                onClick={handleDeleteFood}
                className="bg-[#ff000048] p-3 rounded-lg text-red-400">
                    <MdDeleteForever className="mx-auto text-2xl" />
                </button>
            </td>
        </tr>
    )
}

ManageTableRow.propTypes = {
    index : PropTypes.number,
    item : PropTypes.object,
    refetch : PropTypes.func
}

export default ManageTableRow
