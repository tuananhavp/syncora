import { HydrateClient, trpc } from "@/trpc/sever";
import { Client } from "./Client";
export default async function Home() {
  void trpc.getUsers.prefetch();
  return (
    <HydrateClient>
      <div>...</div>
      {/** ... */}
      <Client />
    </HydrateClient>
  );
}
