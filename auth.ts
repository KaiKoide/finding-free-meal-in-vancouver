import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const { handlers, auth, signIn, signOut } = NextAuth({
	providers: [GitHub],
	callbacks: {
		session: ({ session, token }) => {
			session.user.id = token.sub as string;
			return session;
		},
	},
});
