import { useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import UpdateCoffee from "../components/UpdateCoffee";

const UpdateCoffeePage = () => {
    const coffees = useLoaderData();
    // console.log(coffees);
    return (
        <div>
            <Header></Header>
            <UpdateCoffee coffees={coffees}></UpdateCoffee>
        </div>
    );
};

export default UpdateCoffeePage;