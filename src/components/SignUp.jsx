import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
// import Swal from "sweetalert2";
// import "animate.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const SignUp = () => {
  const [showPass, setShowPass] = useState(false);
  const { createUser } = useContext(AuthContext);

  const handleSignUp = (e) => {
    const passRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?])[A-Za-z\d!@#$%^&*()_+[\]{};':"\\|,.<>?]{6,}$/;
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const terms = form.terms.checked;
    console.log(name, email, password, terms);

    // check password
    if (!passRegex.test(password)) {
      // Swal.fire({
      //   title:
      //     "Password must contain one uppercase letter, one special character, and should not be less than 6 characters.",
      //   icon: "warning",
      //   showClass: {
      //     popup: "animate__animated animate__fadeInDown",
      //   },
      //   hideClass: {
      //     popup: "animate__animated animate__fadeOutUp",
      //   },
      // });
      toast.warn(
        "Password must contain one uppercase letter, one special character, and should not be less than 6 characters.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
      return;
    }
    // check terms & condition
    else if (!terms) {
      // Swal.fire({
      //   title: "Please accept our terms and conditions!",
      //   icon: "warning",
      //   showClass: {
      //     popup: "animate__animated animate__fadeInDown",
      //   },
      //   hideClass: {
      //     popup: "animate__animated animate__fadeOutUp",
      //   },
      // });
      toast.warn("Please accept our terms and conditions!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    // create user in firebase
    createUser(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        toast.success("User Created Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // update profile name
        updateProfile(userCredential.user, {
          displayName: name,
          photoURL: userCredential?.user?.photoURL,
        });
        toast("Profile Updated Successfully!");
        // new user has been created successfully!!!
        const createdAt = userCredential.user?.metadata?.creationTime;
        const user = { name, email, password, createdAt: createdAt };
        fetch("http://localhost:5000/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.insertedId) {
              console.log("User added to the database");
              toast.success("User credential added to the database!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              form.reset();
            }
          });
      })
      .catch((error) => {
        console.error(error);
        // check for duplicate email usage
        if (error.message === "Firebase: Error (auth/email-already-in-use).") {
          toast.error("Email already is in use!", {
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

  return (
    <section>
      <Header></Header>
      <div className="flex justify-center text-center mt-20 mb-20">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            Sign Up
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Enter your details to register.
          </Typography>
          <form onSubmit={handleSignUp} className="mt-8 mb-2 w-72 md:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input type="text" name="name" size="lg" label="Name" required />
              {/* <Input
                type="text"
                name="photo"
                size="lg"
                label="Photo URL"
                required
              /> */}
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
                className="absolute bottom-[188px] right-3"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
              </span>
            </div>
            <Checkbox
              name="terms"
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button className="mt-6" type="submit" fullWidth>
              <input type="submit" value="Register" />
            </Button>

            <Typography color="gray" className="mt-4 text-center font-normal">
              Already have an account?{" "}
              <Link to="/signIn" className="font-medium text-gray-900">
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
      <ToastContainer></ToastContainer>
    </section>
  );
};

export default SignUp;
