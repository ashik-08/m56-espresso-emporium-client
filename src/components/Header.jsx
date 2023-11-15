import logo from "../assets/images/more/logo1.png";
import user from "../assets/images/icons/user.png";

const Header = () => {
  return (
    <div className="bg-head-bg bg-center">
      <div className="navbar">
        <div className="navbar-start hidden md:flex"></div>
        <div className="navbar-center">
          {/* logo & name */}
          <div className="flex justify-center items-center gap-2.5 md:gap-4 md:py-1">
            <img className="w-12" src={logo} alt="logo-img" />
            <p className="text-white text-xl md:text-4xl font-rancho">
              Espresso Emporium
            </p>
          </div>
        </div>
        <div className="navbar-end">
          {/* dropdown icon */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full mt-1.5">
                <img className="w-10 rounded-full" src={user} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 z-[1] p-2 drop-shadow-lg bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Email</a>
              </li>
              <li>
                <a className="justify-between">
                  Users
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
