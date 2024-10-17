import { prisma } from "@repo/db";

export default async function Home() {
	const users = await prisma.user.findMany();
	console.log("NEXT_PUBLIC_TEST", process.env.NEXT_PUBLIC_TEST);

	return (
		<div>
			<div>Users: {JSON.stringify(users)}</div>
			<div>Env: {process.env.NEXT_PUBLIC_TEST}</div>
		</div>
	);
}
