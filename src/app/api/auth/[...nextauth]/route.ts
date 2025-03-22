import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from 'next/headers'

const handler = NextAuth({

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

    }),
  ],

  pages: {
    signIn: "/login",
  },


  callbacks: {
   
    async signIn({ user }) {
      
      if (user) {
        
        const response = await fetch("http://localhost:5193/api/account/google-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            image: user.image,
            googleId: user.id
          }),

        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          const cookieStore = await cookies()
          const locale = cookieStore.get("NEXT_LOCALE")?.value ?? "en";
          return `/${locale}/login?error=${encodeURIComponent(errorData.message)}`;
        }

        const data = await response.json();
        console.log("token: " + data.jwtToken);
       
      }

      return true;

    },
    async jwt({ token, user }) {
      if (user && "jwtToken" in user) {
        token.jwtToken = user.jwtToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub!;
      if (typeof token.jwtToken === "string") {
        session.user.jwtToken = token.jwtToken;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
