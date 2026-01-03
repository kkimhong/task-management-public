import { resolve } from "path";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await new Promise(resolve => setTimeout(resolve, 200))
  return (
    <div className="flex h-screen justify-center items-center">
      <div className="px-8 py-4 rounded-2xl border border-zinc-500 ">
        <h1 className="font-semibold">Project Slug: {slug}</h1>
      </div>
    </div>
  );
}
