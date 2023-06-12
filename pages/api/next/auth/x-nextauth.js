import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { apiURL } from "@/app/modules/constants";

const options = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      type: "credentials",
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, partnerid, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        partnerid: { label: "Partner ID", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { partnerid, password } = credentials;
        const res = await fetch(`${apiURL}/v1/auth/login`, {
          method: "POST",
          body: JSON.stringify({ partnerid, password }),
          headers: { "Content-Type": "application/json" },
        });
        const result = await res.json();
        console.log("credentials", credentials);
        console.log("res", res);
        console.log("result", result);
        // If no error and we have user data, return it
        if (res.ok && result) {
          if (result.success) {
            const user = result.user;
            user.regStatus = result.profile_status;
            user.regPercent = result.percent_complete;
            return user;
          } else {
            throw new Error("Failed to fetch data");
            // return null
          }
        }
        // Return null if user data could not be retrieved
        throw new Error(result.data.message);
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/onboarding/login",
  },
};

export default (req, res) => NextAuth(req, res, options);
