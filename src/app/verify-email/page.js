"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyEmail = () => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const [verified, setverified] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const id = searchParams.get("id");

  useEffect(() => {
    verifyEmail();
  }, []);

  //function to verify email
  const verifyEmail = async () => {
    if (!token || !id) {
      seterror(true);
      toast.error("Invalid verification link", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    setloading(true);
    try {
      const res = await fetch(`/api/verify-email?token=${token}&id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        setverified(true);
        toast.success("Email verified successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      seterror(true);
    } finally {
      setloading(false);
    }
  };
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      {loading && <Loader />}
      {verified && (
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-2xl font-bold text-green-500">
            Email verified successfully!
          </h1>
        </div>
      )}
      {error && (
        <div className="flex h-screen items-center justify-center">
          <h1 className="text-2xl font-bold text-red-500">
            Your verification link is invalid or expired!
          </h1>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
