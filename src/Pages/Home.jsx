import Banner from "../components/Home/Banner/Banner"
import FeaturedFoods from "../components/Home/Banner/FeaturedFoods"
import Faq from "../components/Home/Faq"
import OurMission from "../components/Home/OurMission"
import HelmetTitle from "../components/Shared/HelmetTitle"

const Home = () => {
    return (
        <section>
            <HelmetTitle title='Home'></HelmetTitle>
            <Banner></Banner>
            <FeaturedFoods></FeaturedFoods>
            <OurMission></OurMission>
            <Faq></Faq>
        </section>
    )
}

export default Home
