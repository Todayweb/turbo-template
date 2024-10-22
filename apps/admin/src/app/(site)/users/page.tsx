import { getCurrentSession } from "@/utils/auth";

export default async function Users() {
  const { user } = await getCurrentSession();

  return <div>users</div>;
}
