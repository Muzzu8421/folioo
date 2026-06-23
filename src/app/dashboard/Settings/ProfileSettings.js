import { useState } from "react";
import Image from "next/image";
import { toast, Bounce } from "react-toastify";
import { Camera, Check, AlertCircle } from "lucide-react";
import Loader from "@/components/Loader";

export default function ProfileSettings({ userData, setUserData }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: userData.fullname,
    username: userData.username,
    profilePicture: userData.profilePicture,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData((prev) => ({
        ...prev,
        profilePicture: reader.result,
      }));
      setFormData((prev) => ({
        ...prev,
        profilePicture: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ email: userData.email, ...formData }),
        redirect: "follow",
      };

      const res = await fetch("/api/user/update", requestOptions);
      const data = await res.json();

      if (data.success === false) {
        setIsLoading(false);
        toast.error(data.error || "Failed to update profile", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } else if (data.success === true) {
        setIsLoading(false);
        setUserData((prev) => ({ ...prev, ...formData }));
        toast.success("Profile updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred while updating profile", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Profile Picture */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Profile Picture
        </h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={userData.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-[#111111] shadow-[0_0_15px_rgba(192,132,252,0.2)]"
            />
            <label
              htmlFor="profile-picture"
              className="absolute bottom-0 right-0 w-8 h-8 bg-[#c084fc] rounded-full flex items-center justify-center cursor-pointer hover:shadow-[0_0_15px_rgba(192,132,252,0.5)] transition-shadow text-[#111111]"
            >
              <Camera className="w-4 h-4" />
              <input
                id="profile-picture"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePictureChange}
              />
            </label>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-2">
              JPG, GIF or PNG. Max size 2MB.
            </p>
            <button
              onClick={() =>
                document.getElementById("profile-picture").click()
              }
              className="text-sm text-[#c084fc] font-semibold hover:underline cursor-pointer"
            >
              Upload new picture
            </button>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-white/10 bg-black/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c084fc] focus:border-transparent transition-all"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Username
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
              folioo.me/
            </span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full pl-28 pr-4 py-3 border border-white/10 bg-black/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-[#c084fc] focus:border-transparent transition-all"
              placeholder="username"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Your portfolio will be available at folioo.me/{formData.username}
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-200 mb-2">
            Email Address
          </label>
          <div className="flex items-center gap-3">
            <div className="flex-1 px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-gray-400">
              {userData.email}
            </div>
            {userData.emailVerified ? (
              <span className="text-white inline-flex items-center gap-2 px-4 py-2 bg-[#10b981] bg-opacity-10 rounded-xl text-sm font-semibold">
                <Check className="w-4 h-4" />
                Verified
              </span>
            ) : (
              <span className="text-white inline-flex items-center gap-2 px-4 py-2 bg-[#f59e0b] bg-opacity-10 rounded-xl text-sm font-semibold">
                <AlertCircle className="w-4 h-4" />
                Not Verified
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            className="px-6 cursor-pointer py-3 border border-white/10 text-gray-300 rounded-xl font-semibold hover:bg-white/5 transition-colors"
            onClick={() => {
              setFormData({
                fullname: userData.fullname,
                username: userData.username,
                profilePicture: userData.profilePicture,
              });
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="cursor-pointer px-6 py-3 bg-[#c084fc] text-[#111111] rounded-xl font-semibold hover:shadow-[0_0_15px_rgba(192,132,252,0.3)] transition-all"
          >
            {isLoading ? <Loader /> : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}