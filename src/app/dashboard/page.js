"use client";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
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

  // Mock user data
  const [userData, setUserData] = useState({
    fullname: session?.user?.fullname || "John Doe",
    username: session?.user?.name || "johndoe",
    email: session?.user?.email || "john@example.com",
    emailVerified: false,
    profilePicture:
      session?.user?.profilePicture ||
      "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    hasPassword: true,
    oauthProviders: [
      {
        provider: session?.user?.oauthProviders?.[0]?.provider || "google",
        providerId:
          session?.user?.oauthProviders?.[0]?.providerId || "google-123",
        connectedAt: new Date(),
      },
    ],
  });
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

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    console.log("Update profile:", formData);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    console.log("Update password:", passwordData);
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

  const handleVerifyEmail = () => {
    console.log("Send verification email");
  };

  const handleConnectProvider = (provider) => {
    console.log("Connect provider:", provider);
  };

  const handleDisconnectProvider = (provider) => {
    console.log("Disconnect provider:", provider);
  };

  const isProviderConnected = (provider) => {
    return userData.oauthProviders.some((p) => p.provider === provider);
  };

  const handlesubmit = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ email: userData.email, ...formData }),
      redirect: "follow",
    };

    fetch("/api/user/update", requestOptions);

    const res = await fetch("/api/user/update", requestOptions);

    const data = await res.json();

    if (data.success === false) {
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
  };

  return (
    <div className="max-w-4xl">
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
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#10b981] bg-opacity-10 text-[#10b981] rounded-xl text-sm font-semibold">
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
                    className="cursor-pointer px-6 py-3 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Save Changes
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
                        className="px-6 py-2 bg-[#f59e0b] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                      >
                        Send Verification Email
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Change Password */}
              {userData.hasPassword && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Change Password
                  </h3>
                  <form onSubmit={handlePasswordUpdate} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent transition-all"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
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
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
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
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
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
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Connected Accounts */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Connected Accounts
                </h3>
                <div className="space-y-4">
                  {/* Google */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Google</p>
                        <p className="text-sm text-gray-500">
                          {isProviderConnected("google")
                            ? "Connected"
                            : "Not connected"}
                        </p>
                      </div>
                    </div>
                    {isProviderConnected("google") ? (
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#10b981] bg-opacity-10 text-[#10b981] rounded-full text-sm font-semibold">
                          <Check className="w-4 h-4" />
                          Connected
                        </span>
                        <button
                          onClick={() => handleDisconnectProvider("google")}
                          className="px-4 py-2 text-[#ef4444] hover:bg-[#ef4444] hover:bg-opacity-10 rounded-lg font-semibold transition-all"
                        >
                          Disconnect
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleConnectProvider("google")}
                        className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Connect
                      </button>
                    )}
                  </div>

                  {/* GitHub */}
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">GitHub</p>
                        <p className="text-sm text-gray-500">
                          {isProviderConnected("github")
                            ? "Connected"
                            : "Not connected"}
                        </p>
                      </div>
                    </div>
                    {isProviderConnected("github") ? (
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#10b981] bg-opacity-10 text-[#10b981] rounded-full text-sm font-semibold">
                          <Check className="w-4 h-4" />
                          Connected
                        </span>
                        <button
                          onClick={() => handleDisconnectProvider("github")}
                          className="px-4 py-2 text-[#ef4444] hover:bg-[#ef4444] hover:bg-opacity-10 rounded-lg font-semibold transition-all"
                        >
                          Disconnect
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleConnectProvider("github")}
                        className="px-6 py-2 border border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Connect
                      </button>
                    )}
                  </div>
                </div>

                {!userData.hasPassword &&
                  userData.oauthProviders.length > 0 && (
                    <div className="mt-4 p-4 bg-[#3b82f6] bg-opacity-10 border border-[#3b82f6] border-opacity-20 rounded-xl">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-gray-700">
                          You&apos;re signed in with{" "}
                          {userData.oauthProviders[0].provider}. To add password
                          login, set a password in the security settings.
                        </p>
                      </div>
                    </div>
                  )}
              </div>
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
