"use client";
import { trpc } from "@/trpc/client";

// <-- hooks can only be used in client components
export function Client() {
  const users = trpc.getUsers.useQuery();
  console.log(users.data);
  if (!users.data) return <div>Loading...</div>;
  return <div>{JSON.stringify(users.data)}</div>;
}
