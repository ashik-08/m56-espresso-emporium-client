import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import back from "../assets/images/icons/return.svg";

const ViewCoffee = ({ coffee }) => {
  const { name, chef, supplier, taste, category, details, photo, price } =
    coffee;
  return (
    <section className="bg-coffee-bg bg-cover">
      <div className="container mx-auto pt-12">
        <Link className="flex items-center gap-3 w-fit hover:bg-[#D2B48C] rounded-lg px-2 py-1.5" to="/">
          <img src={back} alt="" />
          <span className="text-gray-text text-2xl font-rancho">
            Back to home
          </span>
        </Link>
        <div className="bg-[#F4F3F0] px-2 md:px-12 lg:px-28 py-20 mt-12 rounded-md flex flex-col md:flex-row justify-center xl:justify-evenly items-center gap-x-5 lg:gap-x-8 gap-y-20 text-product-para text-base md:text-lg font-semibold">
          <figure className="">
            <img className="md:w-11/12 xl:w-full" src={photo} alt=""/>
          </figure>
          <div className="space-y-3">
            <h2 className="text-coffee-text font-rancho text-3xl drop-shadow-coffee mb-10">Niceties</h2>
            <p>
              Name:{" "}
              <span className="text-product-span font-normal">{name}</span>
            </p>
            <p>
              Chef:{" "}
              <span className="text-product-span font-normal">{chef}</span>
            </p>
            <p>
              Supplier:{" "}
              <span className="text-product-span font-normal">{supplier}</span>
            </p>
            <p>
              Taste:{" "}
              <span className="text-product-span font-normal">{taste}</span>
            </p>
            <p>
              Category:{" "}
              <span className="text-product-span font-normal">{category}</span>
            </p>
            <p>
              Details:{" "}
              <span className="text-product-span font-normal">{details}</span>
            </p>
            <p>
              Price:{" "}
              <span className="text-product-span font-normal">
                {price} Taka
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

ViewCoffee.propTypes = {
  coffee: PropTypes.object,
};

export default ViewCoffee;
