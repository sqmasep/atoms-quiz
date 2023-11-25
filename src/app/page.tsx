import { Button } from "~/components/ui/button";

export default async function Home() {
  const res = (await fetch(
    process.env.ATOMS_API_URL ?? "http://localhost:3000/api/atoms",
  ).then(async res => res.json())) as {};

  console.log(res);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[url('/noise.gif')] bg-[length:300px] opacity-5" />
      <div className="pointer-events-none fixed top-10 -z-10 h-1/3 w-1/2 bg-slate-600 blur-[400px]" />

      <pre>{JSON.stringify(res, null, 2)}</pre>
      <div className="flex w-36 flex-col rounded-lg border-4 border-solid border-slate-300 p-4 shadow ">
        <span className="text-slate-500">3</span>
        <span className="text-2xl">Li</span>
        <span className="text-slate-500">Lithium</span>
      </div>

      <Button variant="secondary">testok</Button>
    </main>
  );
}