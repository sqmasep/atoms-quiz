import { parse } from "valibot";
import Atom from "~/components/Atom";
import List from "~/components/List";
import { Button } from "~/components/ui/button";
import AnswerContainer from "~/features/answer/components/AnswerContainer";
import Navbar from "~/layouts/Navbar";
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
      <Navbar />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[url('/noise.gif')] bg-[length:300px] opacity-5" />
      <div className="pointer-events-none fixed top-10 -z-10 h-1/3 w-1/2 bg-slate-600 blur-[400px]" />

      <AnswerContainer />

      {/* <pre>{JSON.stringify(res, null, 2)}</pre> */}

      {/* <div className="grid grid-cols-12">
        <List of={atoms}>
          {atom => (
            <Atom
              key={atom.atomicNumber}
              atomicNumber={atom.atomicNumber}
              symbol={atom.symbol}
              name={atom.name.fr}
              color="#000"
              // FIXME [LAYOUT] w-[125px] is not a good solution and i need to fix the flex container
              className="aspect-square w-[125px]"
            />
          )}
        </List>
      </div> */}
    </main>
  );
}
