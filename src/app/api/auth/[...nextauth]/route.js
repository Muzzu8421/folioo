import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDb from "../../../../../db/connectdb";
import User from "@/models/User";
import { SendEmail } from "@/utils/SendEmail";
import { EmailTemplate } from "@/utils/EmailTemplate";

const authoptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      // Only create a user in the database if they are signing in with GitHub, as Google users will be handled differently
      if (account.provider === "github") {
        await connectDb();
        let currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          currentUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
            fullname: user.email.split("@")[0],
            profilePicture: null,
            emailVerified: false,
            oauthProviders: [
              {
                provider: "github",
                providerId: user.id,
                connectedAt: new Date(),
              },
            ],
          });
          const token = currentUser.getVerificationToken();
          await currentUser.save();
          // Here you would send the verification email to the user with the token
          const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}&id=${currentUser._id}`;
          // Example of sending verification email using SendEmail utility function
          await SendEmail(
            currentUser.email,
            "Verify your email",
            EmailTemplate(verificationUrl, currentUser.fullname),
          );
        }
        return true;
      }

      // Sigin for Google users same as GitHub users but with different provider check
      if (account.provider === "google") {
        await connectDb();
        let currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          currentUser = await User.create({
            email: user.email,
            username: user.email.split("@")[0],
            fullname: user.email.split("@")[0],
            profilePicture: null,
            emailVerified: false,

            oauthProviders: [
              {
                provider: "google",
                providerId: user.id,
                connectedAt: new Date(),
              },
            ],
          });
        }
        const token = currentUser.getVerificationToken();
        await currentUser.save();

        // Here you would send the verification email to the user with the token
        const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}&id=${currentUser._id}`;

        // Example of sending verification email using SendEmail utility function
        await SendEmail(
          currentUser.email,
          "Verify your email",
          EmailTemplate(verificationUrl, currentUser.fullname),
        );
      }
      return true;
    },

    async jwt({ token }) {
      await connectDb();
      const dbUser = await User.findOne({ email: token.email });
      if (dbUser) {
        token.oauthProviders = dbUser.oauthProviders || [];
      }
      return token;
    },

    async session({ session, token }) {
      await connectDb();
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.name = dbUser.username;
      session.user.fullname = dbUser.fullname;
      session.user.profilePicture = dbUser.profilePicture;
      session.user.verified = dbUser.emailVerified;
      session.user.hasPassword = !!dbUser.password;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };
