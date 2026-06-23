<div align="center">

# 🚀 Folioo

**The Ultimate Developer Portfolio Builder**

Build, customize, and deploy stunning, responsive developer portfolios in seconds. Choose from multiple state-of-the-art themes, track your profile analytics, and showcase your best work effortlessly.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](#)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

---

## ✨ Features

- **🎨 Multiple Premium Themes**: Choose from beautifully crafted, fully responsive templates like `Modern`, `Editorial`, and `Terminal`.
- **📊 Built-in Analytics**: Track your portfolio's performance with integrated views, clicks, and engagement rate metrics right from your dashboard.
- **🔐 Secure Authentication**: Seamless login via Google, GitHub, or Email utilizing NextAuth.
- **📱 Fully Responsive**: Flawless design that adapts dynamically to desktops, tablets, and mobile devices.
- **📄 Resume Manager**: Upload, manage, and share your resume directly from your customized portfolio.
- **🔗 Shareable Links & QR Codes**: Instantly generate a shareable link and QR code for your live portfolio.
- **🌙 Dark & Light Mode**: Automated themes following the sleek modern dark aesthetic.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS Modules
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) & Mongoose
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)

## 🚀 Getting Started

Follow these steps to set up Folioo locally on your machine.

### Prerequisites

- Node.js 18.x or later
- MongoDB instance (Atlas or local)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Muzzu8421/folioo.git
   cd folioo
   ```

2. **Install dependencies:**
   Using `pnpm` is recommended.
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the root directory and add the necessary environment variables.
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # NextAuth
   NEXTAUTH_SECRET=your_super_secret_key
   NEXTAUTH_URL=http://localhost:3000

   # OAuth Providers (Google & GitHub)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GITHUB_ID=your_github_id
   GITHUB_SECRET=your_github_secret

   # Email Configuration (for email verification)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=465
   EMAIL_SECURE=true
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_FROM=your_email@gmail.com
   ```

4. **Run the development server:**
   ```bash
   pnpm run dev
   ```

5. **Open the app:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router (pages, api, layouts)
│   ├── api/              # API Routes (Auth, Analytics, User Data)
│   ├── dashboard/        # Dashboard layout and components
│   └── portfolio/        # Public portfolio generation routes
├── components/           # Reusable UI components & Themes
│   ├── Modern.js         # Modern Theme
│   ├── Editorial.js      # Editorial Theme
│   └── Terminal.js       # Terminal Theme
├── models/               # MongoDB Mongoose schemas
├── utils/                # Helper functions (Emails, Parsing)
└── db/                   # Database connection logic
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
  <i>Built with ❤️ by the Folioo Team</i>
</div>
