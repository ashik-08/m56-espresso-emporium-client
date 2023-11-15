import { Link, useLoaderData } from "react-router-dom";
import Product from "./Product";
import cup from "../assets/images/icons/cup.svg";
import { useState } from "react";

const ShowProducts = () => {
  const loadedCoffees = useLoaderData();
  const [coffees, setCoffees] = useState(loadedCoffees);

  return (
    <section className="container mx-auto mt-28">
      <div className="text-center space-y-4 mb-12">
        <p className="text-product-para md:text-xl">--- Sip & Savor ---</p>
        <h1 className="text-coffee-text text-2xl md:text-4xl font-rancho drop-shadow-coffee">
          Our Popular Products
        </h1>
        <div className="flex justify-center pt-4">
          <Link className="flex items-center gap-2 w-fit bg-[#D2B48C] px-4 py-2 rounded-md border-2 border-[#331A15] hover:bg-[#dbc6c6]" to="/AddCoffee">
            <span className="text-white font-rancho drop-shadow-coffee">Add Coffee</span>
            <img src={cup} alt="" />
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {coffees &&
          coffees.map((coffee) => (
            <Product
              key={coffee._id}
              coffee={coffee}
              coffees={coffees}
              setCoffees={setCoffees}
            ></Product>
          ))}
      </div>
    </section>
  );
};

export default ShowProducts;
