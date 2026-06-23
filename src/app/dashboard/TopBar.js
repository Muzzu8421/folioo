import Image from "next/image";
import { Menu, Search, Settings } from "lucide-react";

export default function TopBar({ activePage, userData, onMenuClick }) {
  return (
    <header className="bg-[#0a0a0a] border-b border-white/5 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-400 hover:text-white cursor-pointer"
          >
            <Menu size={24} />
          </button>

          {/* Breadcrumb */}
          <div className="hidden lg:block">
            <h1 className="text-2xl font-medium text-white">
              {activePage === "dashboard" && "Overview"}
              {activePage === "settings" && "Settings"}
              {activePage === "resume" && "Resume Manager"}
              {activePage === "templates" && "Templates"}
            </h1>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-6">


            <div className="flex items-center gap-3 pl-4 border-l border-white/10 cursor-pointer">
              <Image
                src={userData.profilePicture}
                alt="User"
                width={36}
                height={36}
                className="w-10 h-10 rounded-full object-cover border border-white/10"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-200 leading-tight">{userData.fullname || "User"}</p>
                <p className="text-[11px] text-gray-500 mt-0.5">ID: {userData.name || "user123"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}