import { Routes, Route } from "react-router";
import Root from "../Layout/Root";
import Home from "../Pages/Home";
import Error from "../Pages/Error";
import Login from "../Pages/Authentication/Login";
import AvailableFoods from "../Pages/AvailableFoods";
import AddFoods from "../Pages/AddFoods";
import SingUp from "../Pages/Authentication/SingUp";
import PrivateRoutes from "./PrivateRoutes";
import FoodDetails from "../Pages/FoodDetails";
import MyFoodRequest from "../Pages/MyFoodRequest";
import ManageFoods from "../Pages/ManageFoods";
import UpdateFood from "../Pages/UpdateFood";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<Root />}>
                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/available-foods" element={<AvailableFoods></AvailableFoods>}></Route>
                <Route path="/add-foods" element={<PrivateRoutes><AddFoods></AddFoods></PrivateRoutes>}></Route>
                <Route path="/foodDetails/:id" element={<PrivateRoutes><FoodDetails></FoodDetails></PrivateRoutes>}></Route>
                <Route path="/my-food-request" element={<PrivateRoutes><MyFoodRequest></MyFoodRequest></PrivateRoutes>}></Route>
                <Route path="/manage-my-foods" element={<PrivateRoutes><ManageFoods></ManageFoods></PrivateRoutes>}></Route>
                <Route path="/update-food/:id" element={<PrivateRoutes><UpdateFood></UpdateFood></PrivateRoutes>}></Route>
            </Route>

            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signUp" element={<SingUp></SingUp>}></Route>

            <Route path="*" element={<Error></Error>}></Route>
        </Routes>
    )
}

export default AppRoutes
