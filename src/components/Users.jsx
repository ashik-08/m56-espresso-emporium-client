import { useLoaderData } from "react-router-dom";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import auth from "../firebase/firebase.config";
import { deleteUser } from "firebase/auth";

const Users = () => {
  const loadedUsers = useLoaderData();

  const [users, setUsers] = useState(loadedUsers);
  const [info, setInfo] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  // var changingName = info.name;
  // console.log(changingName);

  const TABLE_HEAD = ["Name", "Email", "Created At", "Last Logged In", "", ""];

  const handleDelete = (id) => {
    // make sure user is confirmed to delete
    console.log(id);

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
        // delete user from database
        fetch(`http://localhost:5000/user/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              console.log("Deleted from Database successfully!");

              // delete user from firebase
              const user = auth.currentUser;
              console.log(user);

              deleteUser(user)
                .then(() => {
                  // User deleted.
                  console.log("Deleted from Firebase successfully!");
                  Swal.fire(
                    "Deleted!",
                    "User has been deleted from database & firebase.",
                    "success"
                  );
                })
                .catch((error) => {
                  // An error ocurred
                  console.error(error);
                  Swal.fire(
                    "Not Deleted!",
                    "User could not be deleted for firebase error.",
                    "error"
                  );
                });

              // Swal.fire(
              //   "Deleted!",
              //   "Your file has been deleted from database.",
              //   "success"
              // );

              // remove the user from UI
              const remainingUsers = users.filter((user) => user._id !== id);
              setUsers(remainingUsers);
            }
          });
      }
    });
  };

  const handleGetInfoById = (id) => {
    console.log(id);
    const getInfo = users.find((inf) => inf._id === id);
    setInfo(getInfo);
    setUpdatedName(getInfo.name);
  };

  const handleUpdateName = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    console.log(name);

    const updateName = {
      email: info.email,
      name: name,
    };
    // update name in the database
    fetch("http://localhost:5000/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateName),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          console.log(info);
          // Update the state variable with the new name
          setUpdatedName(name);
          e.target.reset();
          // changingName = info.name;
          // const updatedInfo = info.find((inf) => inf._id === id);
        }
      });
  };

  // Add useEffect to reset updatedName when info changes
  useEffect(() => {
    setUpdatedName(info.name);
  }, [info]);

  return (
    <div>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={index}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(({ _id, name, email, createdAt, lastLoggedAt }) => (
              <tr key={_id} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {
                      // info.name != '' ? {changingName} : {name}
                      info._id === _id ? updatedName : name
                    }
                    {/* {name} */}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {email}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {/* Pass children prop */}
                    {createdAt}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {" "}
                    {lastLoggedAt}
                  </Typography>
                </td>
                <td className="p-4">
                  <button
                    className="btn"
                    onClick={() => {
                      document.getElementById("my_modal_2").showModal();
                      handleGetInfoById(_id);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td className="p-4">
                  <button onClick={() => handleDelete(_id)} className="btn">
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_2" className="modal">
        {/* <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div> */}
        <div className="modal-box flex justify-center text-center">
          <Card color="transparent" shadow={false}>
            <Typography color="gray" className="mt-1 font-normal">
              Enter your name.
            </Typography>
            <form
              onSubmit={handleUpdateName}
              className="mt-8 mb-2 w-72 md:w-96"
            >
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  type="text"
                  name="name"
                  size="lg"
                  label="Name"
                  // defaultValue={info.name}
                  // defaultValue={updatedName}
                  required
                />
              </div>
              <Button className="mt-6" type="submit">
                <input type="submit" value="Update Name" />
              </Button>
            </form>
          </Card>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Users;
