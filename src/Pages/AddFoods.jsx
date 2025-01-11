import AddFoodsForm from "../components/Form/AddFoodsForm"
import HelmetTitle from "../components/Shared/HelmetTitle"

const AddFoods = () => {
    return (
        <section className="py-16">
            
            <HelmetTitle title='Add Food'></HelmetTitle>

            <AddFoodsForm></AddFoodsForm>
            
        </section>
    )
}

export default AddFoods
