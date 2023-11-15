import Swal from "sweetalert2";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import back from "../assets/images/icons/return.svg";

const UpdateCoffee = ({ coffees }) => {
  const { _id, name, chef, supplier, taste, category, details, photo, price } =
    coffees;

  const handleUpdateCoffee = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const chef = form.chef.value;
    const supplier = form.supplier.value;
    const taste = form.taste.value;
    const category = form.category.value;
    const details = form.details.value;
    const photo = form.photo.value;
    const price = form.price.value;
    const updatedCoffee = {
      name,
      chef,
      supplier,
      taste,
      category,
      details,
      photo,
      price,
    };
    console.log(updatedCoffee);

    // send data to the server
    fetch(`http://localhost:5000/coffee/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Coffee details updated successfully",
            confirmButtonText: "Cool",
          });
          //   form.reset();
        } else if (data.modifiedCount === 0) {
          Swal.fire({
            icon: "error",
            title: "Error!",
            text: "No change yet",
            confirmButtonText: "Ok",
          });
        }
      });
  };
  return (
    <section className="bg-coffee-bg bg-cover">
      <div className="container mx-auto pt-12">
        <Link className="flex items-center gap-3 w-fit hover:bg-[#D2B48C] rounded-lg px-2 py-1.5" to="/">
          <img src={back} alt="" />
          <span className="text-gray-text text-2xl font-rancho">
            Back to home
          </span>
        </Link>
        <div className="bg-[#F4F3F0] px-5 md:px-14 lg:px-28 py-20 mt-12 rounded-md">
          <h1 className="text-center text-gray-text font-rancho text-3xl drop-shadow-gray mb-8">
            Update Existing Coffee Details
          </h1>
          <p className="text-center text-[#1B1A1AB2] text-lg mb-8 px-4 md:px-14">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using Content here.
          </p>
          <form onSubmit={handleUpdateCoffee}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <span className="space-y-4">
                <p className="text-input text-lg font-semibold">Name</p>
                <input
                  className="text-placeholder w-full p-3 rounded-md"
                  type="text"
                  name="name"
                  id=""
                  placeholder="Enter coffee name"
                  defaultValue={name}
                />
              </span>
              <span className="space-y-4">
                <p className="text-input text-lg font-semibold">Chef</p>
                <input
                  className="text-placeholder w-full p-3 rounded-md"
                  type="text"
                  name="chef"
                  id=""
                  placeholder="Enter coffee chef"
                  defaultValue={chef}
                />
              </span>
              <span className="space-y-4">
                <p className="text-input text-lg font-semibold">Supplier</p>
                <input
                  className="text-placeholder w-full p-3 rounded-md"
                  type="text"
                  name="supplier"
                  id=""
                  placeholder="Enter coffee supplier"
                  defaultValue={supplier}
                />
              </span>
              <span className="space-y-4">
                <p className="text-input text-lg font-semibold">Taste</p>
                <input
                  className="text-placeholder w-full p-3 rounded-md"
                  type="text"
                  name="taste"
                  id=""
                  placeholder="Enter coffee taste"
                  defaultValue={taste}
                />
              </span>
              <span className="space-y-4">
                <p className="text-input text-lg font-semibold">Category</p>
                <input
                  className="text-placeholder w-full p-3 rounded-md"
                  type="text"
                  name="category"
                  id=""
                  placeholder="Enter coffee category"
                  defaultValue={category}
                />
              </span>
              <span className="space-y-4">
                <p className="text-input text-lg font-semibold">Details</p>
                <input
                  className="text-placeholder w-full p-3 rounded-md"
                  type="text"
                  name="details"
                  id=""
                  placeholder="Enter coffee details"
                  defaultValue={details}
                />
              </span>
              <span className="space-y-4">
                <p className="text-input text-lg font-semibold">Photo</p>
                <input
                  className="text-placeholder w-full p-3 rounded-md"
                  type="text"
                  name="photo"
                  id=""
                  placeholder="Enter photo URL"
                  defaultValue={photo}
                />
              </span>
              <span className="space-y-4">
                <p className="text-input text-lg font-semibold">Price</p>
                <input
                  className="text-placeholder w-full p-3 rounded-md"
                  type="number"
                  name="price"
                  id=""
                  placeholder="Enter coffee price"
                  defaultValue={price}
                />
              </span>
              <span className="md:col-span-2">
                <input
                  className="bg-[#D2B48C] text-[#331A15] text-xl font-rancho w-full p-3 rounded-md border-2 border-[#331A15]"
                  type="submit"
                  value="Update Coffee Details"
                />
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

UpdateCoffee.propTypes = {
  coffees: PropTypes.object,
};

export default UpdateCoffee;
