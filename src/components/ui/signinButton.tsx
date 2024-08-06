import { signIn } from '../../../auth';

export function SignIn() {
	return (
		<form
			action={async () => {
				'use server';
				await signIn();
			}}
		>
			<button
				type='submit'
				className='bg-cyan-500 hover:bg-cyan-500/90 text-white font-bold py-2 px-4 rounded'
			>
				Sign In
			</button>
		</form>
	);
}
