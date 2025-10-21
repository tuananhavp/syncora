import { HydrateClient, trpc } from "@/trpc/sever";
import { Client } from "./Client";
import { requireAuth } from "@/lib/auth-utils";
export default async function Home() {
  await requireAuth();
  void trpc.getUsers.prefetch();
  return (
    <HydrateClient>
      <div>...</div>
      {/** ... */}
      <Client />
    </HydrateClient>
  );
}
