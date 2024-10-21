import { getCurrentSession } from "@/utils/auth";

export default async function Home() {
  const { user } = await getCurrentSession();

  return <div>{user && JSON.stringify({ user })}</div>;
}
