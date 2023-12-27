import { parse } from "valibot";
import GameHandler from "~/components/GameHandler";
import { atomsSchema } from "~/lib/validation/atomSchema";

export default async function Home() {
  const res = await fetch(
    process.env.ATOMS_API_URL ?? "http://localhost:3000/api/atoms",
  ).then(async res => res.json());

  // to perform validation, i'll go for valibot, since it's smaller and i don't need
  // to validate the whole thing, just a few fields
  // on top of that it'll make me learn valibot because i know zod already
  const atoms = parse(atomsSchema, res);

  return (
    <main>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[url('/noise.gif')] bg-[length:300px] opacity-[3%]" />
      <div className="pointer-events-none fixed top-10 -z-10 h-1/3 w-1/2 bg-slate-600 bg-opacity-20 blur-[400px]" />

      <GameHandler atoms={atoms} />
    </main>
  );
}
