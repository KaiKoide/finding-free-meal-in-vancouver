import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AlertComponentProps {
	alertMessage: string;
}

export default function AlertComponent({ alertMessage }: AlertComponentProps) {
	return (
		<Alert variant='destructive'>
			<AlertCircle className='h-4 w-4' />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>{alertMessage}</AlertDescription>
		</Alert>
	);
}
