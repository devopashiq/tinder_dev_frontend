import { useDispatch, useSelector } from "react-redux";
import CardComponent from "../components/CardComponent";
import type { AppDispatch, RootState } from "../utils/store";
import { useState } from "react";
import { addUser, type UserState } from "../utils/userSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constans";
import { Bounce, toast } from "react-toastify";

function Profile() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  console.log(user);

  const [formData, setFormData] = useState<Partial<UserState | null>>({
    firstName: user?.firstName,
    photoUrl: user?.photoUrl,
    lastName: user?.lastName,
    about: user?.about,

    age: user?.age,

    gender: user?.gender,
  });
  console.log(formData);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const result = await axios.patch(BASE_URL + "/profile/edit", formData, {
        withCredentials: true,
      });

      const updatedUser = result.data.data;

      dispatch(addUser(updatedUser));
      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (err :unknown) {
    
      if(axios.isAxiosError(err)){
        toast.error(err.response?.data?.message ||err.message ||'Something went wrong', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }

   
    }
  }

  return (
    <div className="flex bg-  items-center justify-center p-5 gap-3 h-[80vh]">
      <div
        className="card bg-base-300  w-96 p-3  shadow-lg rounded-2xl h-full 
      overflow-y-auto"
      >
        <h1>Edit User Profile</h1>
        <form
          onSubmit={handleSubmit}
          className="p-3 flex flex-col"
        >
          <fieldset className="fieldset">
            <legend className="fieldset-legend">First Name</legend>
            <input
              type="text"
              className="input"
              placeholder="First Name"
              value={formData?.firstName || ""}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Last Name</legend>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              value={formData?.lastName || ""}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Photo URL</legend>
            <input
              type="text"
              className="input"
              placeholder="Photo URL"
              value={formData?.photoUrl || ""}
              onChange={(e) =>
                setFormData({ ...formData, photoUrl: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="fieldset flex">
            <legend className="fieldset-legend">Gender</legend>
            {["male", "female", "other"].map((g) => (
              <div className="flex items-center gap-2" key={g}>
                <input
                  id={g}
                  type="radio"
                  value={g}
                  name="gender"
                  className="radio radio-sm"
                  checked={formData?.gender === g}
                  onChange={() => setFormData({ ...formData, gender: g })}
                />
                <label htmlFor={g}>
                  {" "}
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Age</legend>
            <input
              type="number"
              className="input validator"
              required
              placeholder="Age"
              min={18}
              value={formData?.age}
              onChange={(e) =>
                setFormData({ ...formData, age: Number(e.target.value) })
              }
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea
              className="textarea"
              placeholder="About"
              value={formData?.about}
              onChange={(e) =>
                setFormData({ ...formData, about: e.target.value })
              }
            ></textarea>
          </fieldset>
          <button className="btn btn-primary mt-3" type="submit">
            Save Profile
          </button>
        </form>
      </div>

      <div className="h-full">
        <CardComponent user={formData}></CardComponent>
      </div>
    </div>
  );
}

export default Profile;
