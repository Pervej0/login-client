import React, { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import Header from "../Shared/Header/Header";
import UserDetails from "./UserDetails/UserDetails";

const Tab2 = () => {
  const [usersDetails, setUsersDetails] = useState([]);
  const { handleUserDelete } = useAuth();
  useEffect(() => {
    fetch("https://serene-journey-34919.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => setUsersDetails(data))
      .catch((error) => console.log(error));
  }, []);

  // delete a user
  const handleRemove = (id, uid) => {
    const warning = window.confirm("Are you sure want to delete?");
    if (warning) {
      fetch(`https://serene-journey-34919.herokuapp.com/users/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.acknowledged) {
            const remainOrders = usersDetails.filter((item) => item._id !== id);
            setUsersDetails(remainOrders);
            handleUserDelete(uid);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <>
      <Header />
      <div className="md:w-5/6 w-full my-10 mx-auto flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="px-4 py-3">S/N</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">email</th>
                    <th className="px-4 py-3">phone</th>
                    <th className="px-4 py-3">Address</th>
                    <th className="px-4 py-3">action</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {usersDetails.map((item, index) => (
                    <UserDetails
                      key={item._id}
                      user={item}
                      handleRemove={handleRemove}
                      serial={index + 1}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tab2;
