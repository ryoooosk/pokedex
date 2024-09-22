import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { NamedAPIResourceList, Pokemon, PokemonClient } from 'pokenode-ts';

import PokemonCarousel from '~/components/pokemon-carousel';

import { getRandomUniqueNumbers } from '~/utils/get-random-unique-numbers';

export const meta: MetaFunction = () => {
  return [
    { title: 'Pokedex' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export async function loader() {
  const api = new PokemonClient();
  const list: NamedAPIResourceList = await api.listPokemons(0, 100);
  const randomIds = getRandomUniqueNumbers(8, 1, 1000);
  const randomPokemons: Pokemon[] = await Promise.all(
    randomIds.map(id => api.getPokemonById(id))
  );

  const res = {
    ...list,
    randomPokemons,
  };

  return res;
}

export default function Index() {
  const pokemons = useLoaderData<typeof loader>();

  return (
    <>
      <PokemonCarousel pokemons={pokemons.randomPokemons}></PokemonCarousel>
    </>
  );
}
