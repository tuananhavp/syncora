"use client";
import { trpc } from "@/trpc/client";
import LogOut from "@/features/auth/logout/LogOut";

// <-- hooks can only be used in client components
export function Client() {
  const users = trpc.getUsers.useQuery();

  if (!users.data) return <div>Loading...</div>;
  return (
    <div>
      {JSON.stringify(users.data)} <LogOut />
    </div>
  );
}
