import { useLoaderData } from "react-router-dom";
import Header from "../components/Header";
import ViewCoffee from "../components/ViewCoffee";

const ViewCoffeePage = () => {
  const coffee = useLoaderData();

  return (
    <section>
      <Header></Header>
      <ViewCoffee coffee={coffee}></ViewCoffee>
    </section>
  );
};

export default ViewCoffeePage;
