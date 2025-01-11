import { Outlet } from "react-router"
import Navbar from "../components/Home/Banner/Nav/Navbar"
import Footer from "../components/Home/Footer"

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-[calc(100vh-481px)]">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Root
