import { useRouter } from 'next/router';
export default function Custom404() {
	const router = useRouter();
	return (
		<div>
			<h1>404 - Page not found</h1>
			<button onClick={() => router.push('/')}>Go to Home</button>
		</div>
	);
}
