import { createPost } from "@/server/actions";
import { auth } from "@/server/auth";

export default async function Home() {
  const cAuth = await auth();
  console.log({ cAuth });

  return (
    <main className='min-h-screen py-5 px-4'>
      <h2 className='text-3xl font-bold'>Welcome Back {cAuth?.user?.name}</h2>
    </main>
  );
}
