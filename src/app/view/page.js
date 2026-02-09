"use client";
import Loader from "@/components/Loader";
import React from "react";
import { useSession } from "next-auth/react";

const View = () => {
  const { data: session, status } = useSession();
  return (
    <div className="flex items-center justify-center h-screen">
      <img
        src={session?.user?.image || "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"}
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">
        {session?.user?.fullname || "John Doe"}
      </h1>
      <p className="text-gray-600 mb-4">
        {session?.user?.email || "No email available"}
      </p>
    </div>
  );
};

export default View;
