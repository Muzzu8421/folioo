"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { FileText, Palette } from "lucide-react";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import TopBar from "./TopBar";
import DashboardContent from "./DashboardContent";
import SettingsContent from "./Settings";
import ResumeManager from "./ResumeManager";
import TemplatesManager from "./TemplatesManager";

export default function Dashboard({ onNavigate }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    if (!session || !session.user) {
      router.push("/login");
    }
  }, [session, router]);

  const userData = {
    fullname: session?.user?.fullname || "John Doe",
    name: session?.user?.name || "johndoe",
    email: session?.user?.email,
    profilePicture: session?.user?.image || "/user.png",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        userData={userData}
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <div className="flex-1 lg:ml-60">
        <TopBar
          activePage={activePage}
          userData={userData}
          onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <main className="p-4 sm:p-6 lg:p-8">
          {activePage === "dashboard" && (
            <DashboardContent userName={userData.name} />
          )}

          {activePage === "settings" && <SettingsContent />}

          {activePage === "resume" && <ResumeManager />}

          {activePage === "templates" && <TemplatesManager />}
        </main>
      </div>

      <MobileSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        userData={userData}
        activePage={activePage}
        setActivePage={setActivePage}
        onNavigate={onNavigate}
      />
    </div>
  );
}
