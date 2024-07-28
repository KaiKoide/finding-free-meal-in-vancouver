import { MenuBar } from './menu';
import { SignIn } from '@/components/ui/signinButton';
import { SignOut } from './signoutButton';
import ResetButton from './ResetButton';
import { auth } from '../../../auth';

export async function Header() {
	const session = await auth();

	console.log(session);

	return (
		<div className='bg-gray-100 flex items-center'>
			<MenuBar />
			<ResetButton />
			<div className='ml-auto mr-5'>
				{session?.user ? <SignOut /> : <SignIn />}
			</div>
		</div>
	);
}
