import prisma from "@/lib/prisma";

export default async function Home() {
  const listUsers = await prisma.user.findMany();

  return (
    <div className="font-sans text-2xl text-yellow-400 font-extrabold hover:text-purple-400">
      {listUsers.map((user) => (
        <p key={user.id}>
          {user.id} - {user.name} - {user.email}
        </p>
      ))}
    </div>
  );
}
