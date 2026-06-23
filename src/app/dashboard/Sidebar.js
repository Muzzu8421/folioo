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
  Bell,
} from "lucide-react";
import NavItem from "./Shared/NavItem";

export default function Sidebar({ userData, activePage, setActivePage }) {
  return (
    <aside className="hidden lg:flex flex-col w-60 bg-[#111111] border-r border-white/5 fixed h-full z-20">
      {/* Logo */}
      <div className="p-[18.5px] border-b border-white/5">
        <div className="flex items-center gap-3 cursor-pointer">
          <Image src="/io.png" alt="Folioo Logo" width={32} height={32} />
          <span className="font-semibold text-lg tracking-wide text-white">Folioo</span>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer">
          <Image
            src={userData.profilePicture}
            alt="User Avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover border border-white/10"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-200 truncate">{userData.fullname}</p>
            <p className="text-xs text-gray-500 truncate">{userData.email}</p>
          </div>
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
      <div className="p-4 border-t border-white/5 space-y-4">
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#1A2235] to-[#111111] border border-[#c084fc]/20 shadow-[0_0_20px_rgba(192,132,252,0.1)] mb-4">
          <div className="absolute top-4 left-4">
            <Bell size={16} className="text-gray-400 hidden" />
          </div>
          <h4 className="text-sm font-medium text-white mb-1.5">You&apos;ve reached your limit!</h4>
          <p className="text-[11px] text-gray-400 mb-3 leading-relaxed">
            Please upgrade your plan to avoid losing your files.
          </p>
          <button className="w-full py-2 bg-[#c084fc] text-[#111111] rounded-full text-xs font-semibold hover:bg-cyan-300 transition-colors cursor-pointer">
            Upgrade Plan
          </button>
        </div>

        <div className="space-y-1">
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
      </div>
    </aside>
  );
}