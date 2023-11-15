import {
  Card,
  Input,
  //   Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProvider";
import Header from "./Header";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [showPass, setShowPass] = useState(false);
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    // sign in user
    signInUser(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Logged In",
          showConfirmButton: false,
          timer: 1500,
        });
        // toast.success("Successfully Logged In!", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
        const user = {
          email,
          lastLoggedAt: userCredential.user?.metadata?.lastSignInTime,
        };
        // update last logged at in the database
        fetch("http://localhost:5000/user", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Activity updated to database!",
              showConfirmButton: false,
              timer: 1500,
            });
            // toast.success("Activity updated to database!", {
            //   position: "top-right",
            //   autoClose: 5000,
            //   hideProgressBar: false,
            //   closeOnClick: true,
            //   pauseOnHover: true,
            //   draggable: true,
            //   progress: undefined,
            //   theme: "colored",
            // });
          });
        e.target.reset();
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        // check for invalid credential
        if (
          error.message === "Firebase: Error (auth/invalid-login-credentials)."
        ) {
          toast.error("Invalid Email or Password!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Logged In",
          showConfirmButton: false,
          timer: 1500,
        });
        // toast.success("Successfully Logged In!", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        // Swal.fire({
        //   title: "Something is wrong!\nTry again!",
        //   icon: "error",
        //   showClass: {
        //     popup: "animate__animated animate__fadeInDown",
        //   },
        //   hideClass: {
        //     popup: "animate__animated animate__fadeOutUp",
        //   },
        // });
        toast.error("Something is wrong!\nTry again!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  return (
    <section>
      <Header></Header>
      <div className="flex justify-center text-center mt-20 mb-20">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign In
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to login.
          </Typography>
          <form onSubmit={handleSignIn} className="mt-8 mb-2 w-72 md:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input
                type="email"
                name="email"
                size="lg"
                label="Email"
                required
              />
              <Input
                type={showPass ? "text" : "password"}
                name="password"
                size="lg"
                label="Password"
                required
              />
              <span
                className="absolute top-44 right-3"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </span>
            </div>
            <div>
              {
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  <a
                    href=""
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    Forgot password?
                  </a>
                </Typography>
              }
            </div>

            <Button className="mt-6" type="submit" fullWidth>
              <input type="submit" value="Login" />
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Not registered yet?{" "}
              <Link to="/signUp" className="font-medium text-gray-900">
                Sign Up
              </Link>
            </Typography>
          </form>
          <Typography variant="h6" color="blue-gray" className="mt-4 font-bold">
            Or
          </Typography>
          <Button
            onClick={handleGoogleSignIn}
            className="flex justify-center items-center gap-2 normal-case mt-5"
          >
            <FcGoogle></FcGoogle>Login with Google
          </Button>
        </Card>
      </div>
      <ToastContainer></ToastContainer>
    </section>
  );
};

export default SignIn;
