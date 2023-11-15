import view from "../assets/images/icons/view.svg";
import edit from "../assets/images/icons/edit.svg";
import del from "../assets/images/icons/delete.svg";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Product = ({ coffee, coffees, setCoffees }) => {
  const { _id, name, chef, photo, price } = coffee;

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/coffee/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire(
                "Deleted!",
                `${name} details has been deleted.`,
                "success"
              );
              const remaining = coffees.filter((cof) => cof._id !== _id);
              setCoffees(remaining);
            }
          });
      }
    });
  };

  return (
    <section className="bg-[#F5F4F1] grid grid-cols-4 items-center rounded-xl p-2">
      <figure className="grid justify-center">
        <img src={photo} alt="" />
      </figure>
      <div className="grid col-span-2 ml-3 md:ml-10 text-product-para text-sm md:text-lg font-semibold space-y-2">
        <p>
          Name: <span className="text-product-span font-normal">{name}</span>
        </p>
        <p>
          Chef: <span className="text-product-span font-normal">{chef}</span>
        </p>
        <p>
          Price:{" "}
          <span className="text-product-span font-normal">{price} Taka</span>
        </p>
      </div>
      <div className="grid justify-center gap-2 md:gap-3">
        <figure className="bg-[#D2B48C] md:w-10 rounded">
          <Link to={`/viewCoffee/${_id}`}>
            <img className="p-1 md:p-2 mx-auto" src={view} alt="" />
          </Link>
        </figure>
        <figure className="bg-[#3C393B] md:w-10 rounded">
          <Link to={`/updateCoffee/${_id}`}>
            <img className="p-1 md:p-2 mx-auto" src={edit} alt="" />
          </Link>
        </figure>
        <figure className="bg-[#EA4744] md:w-10 rounded">
          <img
            onClick={() => handleDelete(_id)}
            className="p-1 md:p-2 mx-auto"
            src={del}
            alt=""
          />
        </figure>
      </div>
    </section>
  );
};

Product.propTypes = {
  coffee: PropTypes.object,
  coffees: PropTypes.array,
  setCoffees: PropTypes.func,
};

export default Product;
