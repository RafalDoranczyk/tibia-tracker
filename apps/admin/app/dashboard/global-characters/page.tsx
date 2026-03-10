import { getGlobalCharacters } from "@/modules/global-characters/server";

export default async function GlobalCharactersPage() {
  const a = await getGlobalCharacters();

  console.log(a);

  return <div>Global Characters</div>;
}
