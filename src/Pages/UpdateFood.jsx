import { useParams } from "react-router"
import UpdateFoodsForm from "../components/Form/UpdateFoodsForm"
import HelmetTitle from "../components/Shared/HelmetTitle"

const UpdateFood = () => {

    const {id} = useParams();

    return (
        <section className="py-16">
            
            <HelmetTitle title='Update Food'></HelmetTitle>

            <UpdateFoodsForm id={id}></UpdateFoodsForm>
            
        </section>
    )
}

export default UpdateFood