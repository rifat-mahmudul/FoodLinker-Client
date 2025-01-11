import LoadingSpinner from "../components/LoadingSpinner";
import Card from "../components/Shared/Card";
import Container from "../components/Shared/Container";
import HelmetTitle from "../components/Shared/HelmetTitle";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AvailableFoods = () => {
    const [layout, setLayout] = useState(false);
    const axiosPublic = useAxiosPublic();
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');

    const { data: foods = [], isLoading, refetch } = useQuery({
        queryKey: ['foods', sort],
        queryFn: async () => {
            const { data } = await axiosPublic(`/foods?search=${search}&sort=${sort}`);
            return data;
        },
    });

    refetch();

    const availableFoods = foods.filter((food) => food.status === 'Available');

    const handleLayout = () => {
        setLayout(!layout);
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <section className="pb-16">
            <HelmetTitle title="Available Foods" />

            <Container>
                <div className="flex flex-col gap-5 sm:flex-row justify-between items-center mt-6">
                    <div>
                        <select
                            onChange={(e) => setSort(e.target.value)}
                            className="w-40 text-white bg-inherit border border-blue-500 p-3 rounded-md"
                        >
                            <option className="bg-blue-500 text-black" value="sort">
                                Sort
                            </option>
                            <option className="bg-blue-500 text-black" value="dsc">
                                Sort Expire Date
                            </option>
                        </select>
                    </div>

                    <div>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            className="sm:w-[300px] w-[90%] p-3 bg-inherit border border-blue-500 focus:border-2 focus:border-blue-500 rounded-md outline-0"
                            type="text"
                            placeholder="Search By Food Name"
                        />
                    </div>

                    <div>
                        <button
                            onClick={handleLayout}
                            className={`py-3 hidden sm:block px-5 bg-gradient-to-r ${
                                layout
                                    ? 'from-orange-700 to-blue-400 hover:from-blue-400 hover:to-orange-700'
                                    : 'from-blue-700 to-blue-400 hover:from-blue-400 hover:to-blue-700'
                            } rounded-md font-bold`}
                        >
                            {layout ? 'Reset Layout' : 'Change Layout'}
                        </button>
                    </div>
                </div>

                <div>
                    {availableFoods.length === 0 && (
                        <div className="flex items-center justify-center h-[80vh]">
                            <img className="h-96" src={"https://i.ibb.co.com/jzM8GWn/NoData.png"} alt="" />
                        </div>
                    )}
                </div>

                <div
                    className={`grid grid-cols-1 ${
                        layout ? 'lg:grid-cols-2 sm:grid-cols-1' : 'lg:grid-cols-3 sm:grid-cols-2'
                    } gap-8 mt-10`}
                >
                    {availableFoods.map((food) => (
                        <Card key={food._id} food={food} />
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default AvailableFoods;
