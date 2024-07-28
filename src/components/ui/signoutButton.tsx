import { signOut } from '../../../auth';

export function SignOut() {
	return (
		<form
			action={async () => {
				'use server';
				await signOut();
			}}
		>
			<button
				type='submit'
				className='bg-cyan-500 hover:bg-cyan-500/90 text-white font-bold py-2 px-4 rounded'
			>
				Sign Out
			</button>
		</form>
	);
}
