import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { loginUser } from '@/lib/auth/api';
import { loginSchema } from '@/lib/validations/auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        countryCode: { label: 'Country Code', type: 'text' },
        mobileNumber: { label: 'Mobile Number', type: 'text' },
        userName: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          // Validate credentials using your existing schema
          const validatedCredentials = loginSchema.parse(credentials);

          // Call your API
          const result = await loginUser(validatedCredentials);

          if (result) {
            return {
              id: result.user.id,
              email: result.user.email || '',
              name: `${result.user.firstName} ${result.user.lastName}`,
              firstName: result.user.firstName,
              lastName: result.user.lastName,
              userName: result.user.userName,
              mobileNumber: result.user.mobileNumber,
              countryCode: result.user.countryCode,
              gender: result.user.gender,
              dob: result.user.dob,
              location: result.user.location,
              roles: result.user.roles,
              isActive: result.user.isActive,
              isVerified: result.user.isVerified,
              isMobileVerified: result.user.isMobileVerified,
              isApproved: result.user.isApproved,
              createdAt: result.user.createdAt,
              updatedAt: result.user.updatedAt,
              accessToken: result.token,
            };
          }

          return null;
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Persist the OAuth access_token and user info to the token right after signin
      if (user) {
        token.accessToken = user.accessToken;
        token.user = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          userName: user.userName,
          mobileNumber: user.mobileNumber,
          countryCode: user.countryCode,
          email: user.email || '',
          gender: user.gender,
          dob: user.dob,
          location: user.location,
          roles: user.roles,
          isActive: user.isActive,
          isVerified: user.isVerified,
          isMobileVerified: user.isMobileVerified,
          isApproved: user.isApproved,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (token) {
        session.user = {
          ...session.user,
          ...token.user,
        };
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/signin',
    error: '/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  jwt: {
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
});
