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
  X as XIcon,
} from "lucide-react";
import NavItem from "./Shared/NavItem";

export default function MobileSidebar({
  isOpen,
  onClose,
  userData,
  activePage,
  setActivePage,
  onNavigate,
}) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="absolute inset-y-0 left-0 w-64 bg-white">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <button
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] flex items-center justify-center">
                <span
                  className="text-white font-bold text-xl"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  F
                </span>
              </div>
              <span
                className="text-2xl font-bold bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] bg-clip-text text-transparent"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Folioo
              </span>
            </button>
            <button onClick={onClose}>
              <XIcon className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3 p-3">
              <Image
                src={userData.profilePicture}
                alt="User Avatar"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">
                  {userData.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {userData.email}
                </p>
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
                onClick={() => {
                  setActivePage("dashboard");
                  onClose();
                }}
              />
              <NavItem
                icon={<FileText className="w-5 h-5" />}
                label="Resume Manager"
                active={activePage === "resume"}
                onClick={() => {
                  setActivePage("resume");
                  onClose();
                }}
              />
              <NavItem
                icon={<Palette className="w-5 h-5" />}
                label="Templates"
                active={activePage === "templates"}
                onClick={() => {
                  setActivePage("templates");
                  onClose();
                }}
              />
              <NavItem
                icon={<SettingsIcon className="w-5 h-5" />}
                label="Settings"
                active={activePage === "settings"}
                onClick={() => {
                  setActivePage("settings");
                  onClose();
                }}
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
              onClick={() => {
                onClose();
                signOut();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}