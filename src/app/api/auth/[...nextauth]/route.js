import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDb from "../../../../../db/connectdb";
import User from "@/models/User";

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
        const currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          await User.create({
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
        }
      }

      // Sigin for Google users same as GitHub users but with different provider check
      if (account.provider === "google") {
        await connectDb();
        const currentUser = await User.findOne({ email: user.email });
        if (!currentUser) {
          await User.create({
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
      }

      return true;
    },

    async jwt({ token }) {
      connectDb();
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
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authoptions);

export { handler as GET, handler as POST };
