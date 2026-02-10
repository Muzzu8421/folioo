import Image from "next/image";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Palette,
  Settings as SettingsIcon,
  Crown,
  HelpCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import NavItem from "./Shared/NavItem";

export default function Sidebar({ userData, activePage, setActivePage }) {
  return (
    <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-gray-200 fixed h-full">
      {/* Logo */}
      <div className="p-[18.5px] border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Image
            src="/folioo_logo.png"
            alt="Folioo Logo"
            width={120}
            height={120}
            className="object-contain"
          />
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
          <Image
            src={userData.profilePicture}
            alt="User Avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 truncate">{userData.fullname}</p>
            <p className="text-sm text-gray-500 truncate">{userData.email}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          <NavItem
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            active={activePage === "dashboard"}
            onClick={() => setActivePage("dashboard")}
          />
          <NavItem
            icon={<FileText className="w-5 h-5" />}
            label="Resume Manager"
            active={activePage === "resume"}
            onClick={() => setActivePage("resume")}
          />
          <NavItem
            icon={<Palette className="w-5 h-5" />}
            label="Templates"
            active={activePage === "templates"}
            onClick={() => setActivePage("templates")}
          />
          <NavItem
            icon={<SettingsIcon className="w-5 h-5" />}
            label="Settings"
            active={activePage === "settings"}
            onClick={() => setActivePage("settings")}
          />
          <NavItem
            icon={<Crown className="w-5 h-5" />}
            label="Upgrade to Pro"
            badge="Pro"
          />
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 space-y-1">
        <NavItem
          icon={<HelpCircle className="w-5 h-5" />}
          label="Help & Support"
        />
        <NavItem
          icon={<LogOut className="w-5 h-5" />}
          label="Logout"
          onClick={() => signOut()}
        />
      </div>
    </aside>
  );
}