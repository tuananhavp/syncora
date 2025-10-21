import { HydrateClient, trpc } from "@/trpc/sever";
import { Client } from "./Client";
import { requireAuth } from "@/lib/auth-utils";
import LogOut from "@/features/auth/logout/LogOut";
export default async function Home() {
  await requireAuth();
  void trpc.getUsers.prefetch();
  return (
    <HydrateClient>
      <div>...</div>
      {/** ... */}
      <Client />
      <LogOut />
    </HydrateClient>
  );
}
