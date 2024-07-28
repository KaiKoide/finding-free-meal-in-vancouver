import { Roboto, Darumadrop_One } from 'next/font/google';

export const roboto = Roboto({
	subsets: ['latin'],
	weight: '400',
	variable: '--font-roboto',
	display: 'swap',
});

export const darumadropOne = Darumadrop_One({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-darumadropOne',
	display: 'swap',
});
