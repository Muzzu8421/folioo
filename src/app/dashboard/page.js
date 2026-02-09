"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  LayoutDashboard,
  FileText,
  Palette,
  Settings as SettingsIcon,
  Crown,
  HelpCircle,
  LogOut,
  ChevronDown,
  Search,
  Bell,
  Eye,
  Link2,
  Upload,
  TrendingUp,
  TrendingDown,
  Copy,
  ExternalLink,
  Lightbulb,
  X as XIcon,
  Menu,
  User,
  Mail,
  Shield,
  Camera,
  Check,
  AlertCircle,
  EyeOff,
  Globe,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loader from "@/components/Loader";

// Mock data for the chart
const chartData = [
  { date: "Jan 5", views: 120, clicks: 15 },
  { date: "Jan 10", views: 180, clicks: 22 },
  { date: "Jan 15", views: 240, clicks: 35 },
  { date: "Jan 20", views: 290, clicks: 42 },
  { date: "Jan 25", views: 350, clicks: 48 },
  { date: "Jan 30", views: 420, clicks: 58 },
  { date: "Feb 4", views: 520, clicks: 75 },
];

export default function Dashboard({ onNavigate }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");

  // if not signed in redirect to login page
  useEffect(() => {
    if (!session || !session.user) {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-60 bg-white border-r border-gray-200 fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
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
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
              alt="John Doe"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 truncate">John Doe</p>
              <p className="text-sm text-gray-500 truncate">john@example.com</p>
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

      {/* Main Content */}
      <div className="flex-1 lg:ml-60">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                {/* Search Bar - Hidden on mobile */}
                <div className="hidden md:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl">
                  <Search className="w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent border-none outline-none text-gray-900 placeholder-gray-500 w-64"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-xl">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full"></span>
                </button>

                {/* User Avatar */}
                <button className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {activePage === "dashboard" && (
            <DashboardContent
              showBanner={showBanner}
              setShowBanner={setShowBanner}
            />
          )}

          {activePage === "settings" && <SettingsContent />}

          {activePage === "resume" && (
            <div className="text-center py-20">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Resume Manager
              </h2>
              <p className="text-gray-600">
                This section is under construction
              </p>
            </div>
          )}

          {activePage === "templates" && (
            <div className="text-center py-20">
              <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Templates
              </h2>
              <p className="text-gray-600">
                This section is under construction
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
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
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <XIcon className="w-6 h-6 text-gray-700" />
                </button>
              </div>

              {/* User Profile */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3 p-3">
                  <img
                    src="https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                    alt="John Doe"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      John Doe
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      john@example.com
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
                      setIsMobileMenuOpen(false);
                    }}
                  />
                  <NavItem
                    icon={<FileText className="w-5 h-5" />}
                    label="Resume Manager"
                    active={activePage === "resume"}
                    onClick={() => {
                      setActivePage("resume");
                      setIsMobileMenuOpen(false);
                    }}
                  />
                  <NavItem
                    icon={<Palette className="w-5 h-5" />}
                    label="Templates"
                    active={activePage === "templates"}
                    onClick={() => {
                      setActivePage("templates");
                      setIsMobileMenuOpen(false);
                    }}
                  />
                  <NavItem
                    icon={<SettingsIcon className="w-5 h-5" />}
                    label="Settings"
                    active={activePage === "settings"}
                    onClick={() => {
                      setActivePage("settings");
                      setIsMobileMenuOpen(false);
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
                    setIsMobileMenuOpen(false);
                    signOut();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Dashboard Content Component
function DashboardContent({ showBanner, setShowBanner }) {
  return (
    <>
      {/* Welcome Banner */}
      {showBanner && (
        <div className="bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] rounded-2xl p-6 sm:p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2
                className="text-2xl sm:text-3xl font-bold mb-2"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Welcome back, John! 👋
              </h2>
              <p className="text-white/90">
                Your portfolio is looking great. Keep it up!
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-white text-[#4f46e5] rounded-lg font-semibold hover:shadow-lg transition-all">
                Update Resume
              </button>
              <button className="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-lg font-semibold hover:bg-white/30 transition-all">
                View Portfolio
              </button>
              <button className="px-4 py-2 bg-white/20 backdrop-blur text-white rounded-lg font-semibold hover:bg-white/30 transition-all">
                Share Link
              </button>
            </div>
          </div>
          <button
            onClick={() => setShowBanner(false)}
            className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Eye className="w-6 h-6" />}
          value="2,847"
          label="Portfolio Views"
          trend={12.5}
          positive
        />
        <StatCard
          icon={<Link2 className="w-6 h-6" />}
          value="124"
          label="Profile Clicks"
          trend={8.2}
          positive
        />
        <StatCard
          icon={<Upload className="w-6 h-6" />}
          value="45"
          label="Downloads"
          trend={-3.1}
          positive={false}
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          value="12.4%"
          label="Engagement Rate"
          trend={5.3}
          positive
        />
      </div>

      {/* Your Portfolio Section */}
      <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Portfolio</h3>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Portfolio Preview */}
          <div className="flex-shrink-0">
            <div className="w-full lg:w-64 aspect-video rounded-lg overflow-hidden border-4 border-gradient">
              <img
                src="https://images.unsplash.com/photo-1727686679920-79be3ffe07d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080"
                alt="Portfolio preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Portfolio Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm text-gray-700">
                folioo.me/johndoe
              </div>
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Copy className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-[#10b981] bg-opacity-10 text-[#10b981] rounded-full text-sm font-semibold">
                ● Live
              </span>
              <span className="text-sm text-gray-500">
                Last updated 2 days ago
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                View Live
              </button>
              <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Edit
              </button>
              <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Settings
              </button>
            </div>

            {/* QR Code */}
            <div className="mt-4 inline-block">
              <div className="w-24 h-24 bg-gray-900 rounded-lg"></div>
              <p className="text-xs text-gray-500 mt-1 text-center">QR Code</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <ActivityItem
              icon={<FileText className="w-5 h-5 text-[#4f46e5]" />}
              text="Resume updated"
              time="2 hours ago"
            />
            <ActivityItem
              icon={<Eye className="w-5 h-5 text-[#10b981]" />}
              text="Portfolio viewed by Google recruiter"
              time="5 hours ago"
            />
            <ActivityItem
              icon={<Palette className="w-5 h-5 text-[#7c3aed]" />}
              text="Template changed to 'Modern Developer'"
              time="Yesterday"
            />
            <ActivityItem
              icon={<Link2 className="w-5 h-5 text-[#fb923c]" />}
              text="Portfolio link shared on LinkedIn"
              time="2 days ago"
            />
            <ActivityItem
              icon={<TrendingUp className="w-5 h-5 text-[#3b82f6]" />}
              text="Reached 1000 profile views"
              time="3 days ago"
            />
          </div>
          <button className="w-full mt-4 py-2 text-[#4f46e5] font-semibold hover:bg-gray-50 rounded-lg transition-colors">
            View all activity
          </button>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              <QuickActionCard
                icon={<Upload className="w-6 h-6" />}
                title="Update Resume"
                description="Upload new version"
              />
              <QuickActionCard
                icon={<Palette className="w-6 h-6" />}
                title="Change Template"
                description="Browse templates"
              />
              <QuickActionCard
                icon={<Globe className="w-6 h-6" />}
                title="Custom Domain"
                description="Add your domain"
              />
              <QuickActionCard
                icon={<ExternalLink className="w-6 h-6" />}
                title="Share Portfolio"
                description="Get shareable link"
              />
            </div>
          </div>

          {/* Suggestions Card */}
          <div className="bg-gradient-to-br from-[#fb923c]/10 to-[#fb923c]/5 rounded-2xl p-6 border border-[#fb923c]/20">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#fb923c] flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Tips to Improve Your Portfolio
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>
                    • Add a professional photo to increase engagement by 40%
                  </li>
                  <li>• Include 3-5 key projects to showcase your skills</li>
                  <li>• Update your contact information</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-[#fb923c] text-white rounded-lg font-semibold text-sm hover:shadow-lg transition-all">
                Learn more
              </button>
              <button className="px-4 py-2 text-gray-700 hover:bg-white/50 rounded-lg font-semibold text-sm transition-colors">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Graph */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Portfolio Performance
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ fill: "#4f46e5", r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="#fb923c"
                strokeWidth={3}
                dot={{ fill: "#fb923c", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-8 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#4f46e5] rounded-full"></div>
            <span className="text-sm text-gray-700">Views</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#fb923c] rounded-full"></div>
            <span className="text-sm text-gray-700">Clicks</span>
          </div>
        </div>
      </div>
    </>
  );
}

// Settings Content Component
function SettingsContent() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize user data from session or use defaults
  const [userData, setUserData] = useState({
    fullname: session?.user?.fullname || "John Doe",
    username: session?.user?.name || "johndoe",
    email: session?.user?.email || "john@example.com",
    emailVerified: session?.user?.verified || false,
    profilePicture:
      session?.user?.image ||
      "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
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
  console.log("User Data:", userData.profilePicture);
  const [formData, setFormData] = useState({
    fullname: userData.fullname,
    username: userData.username,
    profilePicture: userData.profilePicture,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log("Update profile:", formData);
  };

  const handlePasswordUpdate = async () => {
    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords do not match", {
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

    // Validate password length
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long", {
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

    setIsLoading(true);

    try {
      const res = await fetch("/api/user/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          currentPassword: passwordData.currentPassword || null,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await res.json();

      setIsLoading(false);

      if (data.success === false) {
        toast.error(data.error || "Failed to update password", {
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
      } else if (data.success === true) {
        toast.success("Password updated successfully!", {
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
        setUserData((prev) => ({ ...prev, hasPassword: true }));
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred while updating password", {
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

  const handleVerifyEmail = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userData.email }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsLoading(false);
        toast.success(data.message, {
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
      } else {
        setIsLoading(false);
        toast.warn(data.message || "Failed to send verification email", {
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
      setIsLoading(false);
      toast.error("An error occurred while verifying email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handlesubmit = async () => {
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
          theme: "light",
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
          theme: "light",
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
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Tabs */}
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
          {/* Profile Settings Tab */}
          {activeTab === "profile" && (
            <div className="space-y-8">
              {/* Profile Picture */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Profile Picture
                </h3>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={userData.profilePicture}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
                    />
                    <label
                      htmlFor="profile-picture"
                      className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-shadow"
                    >
                      <Camera className="w-4 h-4 text-white" />
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
                    <p className="text-sm text-gray-600 mb-2">
                      JPG, GIF or PNG. Max size 2MB.
                    </p>
                    <button
                      onClick={() =>
                        document.getElementById("profile-picture").click()
                      }
                      className="text-sm text-[#4f46e5] font-semibold hover:underline"
                    >
                      Upload new picture
                    </button>
                  </div>
                </div>
              </div>

              {/* Profile Form */}
              <form onSubmit={handleProfileUpdate} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
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
                      className="w-full pl-28 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent transition-all"
                      placeholder="username"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Your portfolio will be available at folioo.me/
                    {formData.username}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-700">
                      {userData.email}
                    </div>
                    {userData.emailVerified ? (
                      <span className="text-white inline-flex items-center gap-2 px-4 py-2 bg-[#10b981] bg-opacity-10 text-[#10b981] rounded-xl text-sm font-semibold">
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
                    className="px-6 cursor-pointer py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
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
                    onClick={handlesubmit}
                    disabled={isLoading}
                    className="cursor-pointer px-6 py-3 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    {isLoading ? <Loader /> : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Account Settings Tab */}
          {activeTab === "account" && (
            <div className="space-y-8">
              {/* Email Verification */}
              {!userData.emailVerified && (
                <div className="bg-[#f59e0b] bg-opacity-10 border border-[#f59e0b] border-opacity-20 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#f59e0b] rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Verify Your Email
                      </h3>
                      <p className="text-sm text-gray-700 mb-4">
                        Please verify your email address to secure your account
                        and unlock all features.
                      </p>
                      <button
                        onClick={handleVerifyEmail}
                        className="cursor-pointer px-6 py-2 bg-[#4f46e5] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                      >
                        Send Verification Email
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Change Password */}
              {
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Change Password
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              currentPassword: e.target.value,
                            })
                          }
                          disabled={!userData.hasPassword}
                          className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent transition-all"
                          placeholder={
                            !userData.hasPassword
                              ? "Set a password first"
                              : "Enter current password"
                          }
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {userData.hasPassword ? (
                            showPassword ? (
                              <EyeOff className="w-5 h-5" />
                            ) : (
                              <Eye className="w-5 h-5" />
                            )
                          ) : (
                            <span></span>
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              newPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent transition-all"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Must be at least 6 characters long
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({
                              ...passwordData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent transition-all"
                          placeholder="Confirm new password"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={handlePasswordUpdate}
                        disabled={isLoading}
                        className="px-6 py-3 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? <Loader /> : "Update Password"}
                      </button>
                    </div>
                  </div>
                </div>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false, badge, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
        active
          ? "bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white font-semibold"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 bg-white text-[#4f46e5] rounded-full text-xs font-semibold">
          {badge}
        </span>
      )}
    </button>
  );
}

function StatCard({ icon, value, label, trend, positive }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] flex items-center justify-center text-white">
          {icon}
        </div>
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${
            positive ? "text-[#10b981]" : "text-[#ef4444]"
          }`}
        >
          {positive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          {Math.abs(trend)}%
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
}

function ActivityItem({ icon, text, time }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-900 text-sm">{text}</p>
        <p className="text-gray-500 text-xs mt-0.5">{time}</p>
      </div>
    </div>
  );
}

function QuickActionCard({ icon, title, description }) {
  return (
    <button className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:border-[#4f46e5] hover:bg-gray-50 transition-all text-left">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] flex items-center justify-center text-white flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-gray-900 text-sm">{title}</p>
        <p className="text-gray-600 text-xs mt-0.5">{description}</p>
      </div>
    </button>
  );
}
