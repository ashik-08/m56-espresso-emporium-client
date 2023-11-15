import Header from "../components/Header";
import back from "../assets/images/icons/return.svg";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section>
      <Header></Header>
      <div className="flex justify-center mt-16">
        <Link className="flex items-center gap-3 w-fit hover:bg-[#D2B48C] rounded-lg px-2 py-1.5" to="/">
          <img src={back} alt="" />
          <span className="text-gray-text text-2xl font-rancho">
            Back to home
          </span>
        </Link>
      </div>
      <figure className="flex justify-center mt-16 lg:mt-28">
        <img src="https://i.ibb.co/JHf0Gf0/404.gif" alt="404-error-gif" />
      </figure>
    </section>
  );
};

export default ErrorPage;
