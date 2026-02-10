import Image from "next/image";
import { Menu } from "lucide-react";

export default function TopBar({ activePage, userData, onMenuClick }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-700"
          >
            <Menu size={24} />
          </button>

          {/* Breadcrumb */}
          <div className="hidden lg:block">
            <h1 className="text-2xl font-bold text-gray-900">
              {activePage === "dashboard" && "Dashboard"}
              {activePage === "settings" && "Settings"}
              {activePage === "resume" && "Resume Manager"}
              {activePage === "templates" && "Templates"}
            </h1>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* User Avatar */}
            <button className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={userData.profilePicture}
                alt="User"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}