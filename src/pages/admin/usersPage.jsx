import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";
import { MdBlock, MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { Loader } from "../../components/loader";
import toast from "react-hot-toast";

function UserBlockConfirm(props) {
  const email = props.user.email;
  const close = props.close;
  const refresh = props.refresh;

  function blockUser() {
    const token = localStorage.getItem("token");
    axios
      .put(
        import.meta.env.VITE_API_URL + "/api/users/block/" + email,
        {
          isBlock: !props.user.isBlock
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },

      )
      .then((response) => {
        console.log(response.data);
        close();
        toast.success("User block status changed successfully");
        refresh();
      })
      .catch(() => {
        toast.error("Failed to change user block status");
      });
  }

  return (
    <div className="flex justify-center items-center fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100]">
      <div className=" bg-primary gap-[20px] flex flex-col justify-center items-center w-[80%] sm:w-[500px] h-[200px] bg-white relative rounded-2xl border-2 border-accent">
        <button
          onClick={close}
          className="absolute right-[-40px] top-[-40px] w-[30px] h-[30px] bg-red-500 rounded-full text-white flex justify-center items-center border border-red-600 hover:bg-white hover:text-red-600"
        >
          <GrClose />
        </button>
        <p className="text-xl font-semibold text-center">
          Are you sure? You want to {props.user.isBlock ? "unblock":"block"} the user with email:
          {email}?
        </p>
        <div className="flex gap-[40px]">
          <button
            onClick={close}
            className="w-[100px] p-[10px] bg-white text-secondary  rounded-4xl border border-accent hover:bg-accent hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={blockUser}
            className="w-[100px] p-[10px] bg-white text-secondary rounded-4xl border border-accent hover:bg-accent hover:text-white"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [isBlockedConfirmVisible, setIsBlockedConfirmVisible] = useState(false);
  const [userToBlock, setUserToBlock] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (token == null) {
        toast.error("Please login to access admin panel");
        navigate("/login");
        return;
      }
      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/all-users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);

          if (Array.isArray(response.data)) {
            setUsers(response.data);
          } else if (Array.isArray(response.data.users)) {
            setUsers(response.data.users);
          } else {
            setUsers([]);
          }

          setIsLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <div className="w-full min-h-full bg-primary/40 p-4 sm:p-6">
      {isBlockedConfirmVisible && (
        <UserBlockConfirm
          refresh={() => {
            setIsLoading(true);
          }}
          user={userToBlock}
          close={() => {
            setIsBlockedConfirmVisible(false);
          }}
        />
      )}
      {/* Page Header */}
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-secondary">
            Users
          </h1>
          <p className="text-sm text-secondary/70">
            Manage users catalog: view, edit, and remove users.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center rounded-full border border-secondary/10 bg-white/70 px-4 py-2 text-sm text-secondary shadow-sm">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-accent" />
            Users:{" "}
            <span className="ml-1 font-semibold text-secondary">
              {users.length}
            </span>
          </div>
        </div>
      </div>

      {/*Mobile Product Cards*/}
      <div className="sm:hidden flex flex-col gap-4 p-4">
        {users.map((user) => {
          return (
            <div
              key={user.email}
              className="bg-white rounded-xl border border-secondary/10 p-4 shadow-sm"
            >
              <div className="flex gap-4 items-center font-semibold">
                <img
                  src={user.image}
                  referrerPolicy="no-referrer"
                  className={
                    "w-15 h-15 object-cover border-2 rounded-full " +
                    (user.isBlock ? " border-red-600" : "border-green-600")
                  }
                  alt={user.firstName}
                />
                <div className="flex flex-col flex-1">
                  <span className="font text-secondary flex items-center gap-2">
                    {user.email}
                    {user.isEmailVerified && <MdVerified color="blue" />}
                  </span>

                  <span className="text-xs text-secondary/60">
                    {user.firstName}
                  </span>

                  <span className="text-sm text-secondary/70 ">
                    {user.lastName}
                  </span>

                  <span className="text-sm text-secondary/70">
                    <p className="">
                      {user.role == "admin" && <MdOutlineAdminPanelSettings />}
                    </p>
                    {user.role}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setUserToBlock(user);
                      setIsBlockedConfirmVisible(true);
                    }}
                    className="h-9 w-9 flex items-center justify-center rounded-lg border border-secondary/10 bg-white/80 shadow-sm hover:border-red-200 hover:bg-red-50 transition"
                  >
                    <MdBlock className="text-lg text-secondary/70 hover:text-red-600 transition" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-secondary/10 bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_-35px_rgba(0,0,0,0.35)] overflow-hidden">
        {/* Scroll wrapper */}
        <div className="hidden sm:block w-full overflow-x-auto">
          {isLoading ? (
            <Loader />
          ) : (
            <table className="w-full min-w-[900px] text-left">
              <thead className="sticky top-0 z-10 bg-white/80 backdrop-blur">
                <tr className="text-xs uppercase tracking-wider text-secondary/70">
                  <th className="px-5 py-4 font-semibold">Image</th>
                  <th className="px-5 py-4 font-semibold">Email</th>
                  <th className="px-5 py-4 font-semibold">First Name</th>
                  <th className="px-5 py-4 font-semibold">Last Name</th>
                  <th className="px-5 py-4 font-semibold">Role</th>
                  <th className="px-5 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-secondary/10">
                {users.map((user) => {
                  return (
                    <tr
                      key={user.email}
                      className="group hover:bg-primary/35 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full overflow-hidden bg-white shadow-sm">
                            <img
                              src={user.image}
                              referrerPolicy="no-referrer"
                              className={
                                "w-full h-full object-cover border-2 rounded-full " +
                                (user.isBlock
                                  ? " border-red-600"
                                  : "border-green-600")
                              }
                              alt={user.firstName}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center rounded-full border border-secondary/10 bg-white px-3 py-1 text-sm text-secondary shadow-sm gap-2">
                          {user.email}
                          {user.isEmailVerified && <MdVerified color="blue" />}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-col">
                          <span className=" text-secondary">
                            {user.firstName}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-secondary">{user.lastName}</span>
                      </td>

                      <td className="px-5 py-4 text-secondary/70 h-full">
                        <div className="flex items-center gap-2">
                          <p className="">
                            {user.role == "admin" && (
                              <MdOutlineAdminPanelSettings />
                            )}
                          </p>
                          {user.role}
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="text-secondary">
                          {
                            <button
                              className="w-[100px] h-[30px] bg-accent hover:bg-accent/70 text-white rounded-full cursor-pointer"
                              onClick={() => {
                                setUserToBlock(user);
                                setIsBlockedConfirmVisible(true);
                              }}
                            >
                              {user.isBlock ? "Unblock" : "Block"}
                            </button>
                          }
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
