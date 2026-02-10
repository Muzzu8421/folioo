import { useState } from "react";
import { useSession } from "next-auth/react";
import { User, Shield } from "lucide-react";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";

export default function SettingsContent() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [userData, setUserData] = useState({
    fullname: session?.user?.fullname || "John Doe",
    username: session?.user?.name || "johndoe",
    email: session?.user?.email || "john@example.com",
    emailVerified: session?.user?.verified || false,
    profilePicture:
      session?.user?.image ||
      "/user.png",
    hasPassword: session?.user?.hasPassword,
    oauthProviders: [
      {
        provider: session?.user?.oauthProviders?.[0]?.provider || "google",
        providerId:
          session?.user?.oauthProviders?.[0]?.providerId || "google-123",
        connectedAt: new Date(),
      },
    ],
  });

  return (
    <div className="max-w-4xl">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === "profile"
                  ? "text-[#4f46e5] border-b-2 border-[#4f46e5]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Profile Settings
            </button>
            <button
              onClick={() => setActiveTab("account")}
              className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === "account"
                  ? "text-[#4f46e5] border-b-2 border-[#4f46e5]"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Shield className="w-4 h-4 inline mr-2" />
              Account Settings
            </button>
          </nav>
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === "profile" && (
            <ProfileSettings userData={userData} setUserData={setUserData} />
          )}

          {activeTab === "account" && (
            <AccountSettings userData={userData} setUserData={setUserData} />
          )}
        </div>
      </div>
    </div>
  );
}