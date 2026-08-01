import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

const allowedGitHubUsers = new Set(
  (process.env.AUTHORIZED_GITHUB_USERS ?? "")
    .split(",")
    .map((login) => login.trim().toLowerCase())
    .filter(Boolean)
);

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      authorization: { params: { scope: "read:user" } }
    })
  ],
  pages: {
    signIn: "/login",
    error: "/login"
  },
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    signIn({ profile }) {
      const login = typeof profile?.login === "string" ? profile.login.toLowerCase() : "";
      return allowedGitHubUsers.has(login);
    },
    authorized({ auth: session, request }) {
      if (request.nextUrl.pathname === "/login") return true;
      return Boolean(session?.user);
    }
  }
});
