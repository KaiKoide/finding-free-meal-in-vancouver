import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [GitHub, Google],
	callbacks: {
		session: ({ session, token }) => {
			session.user.id = token.sub as string;
			return session;
		},
	},
});
