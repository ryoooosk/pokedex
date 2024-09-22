import { useLoaderData } from '@remix-run/react';
import { Star } from 'lucide-react';
import { PokemonClient } from 'pokenode-ts';
import StatsChart from '~/components/stats-chart';
import StatsDefinitionList from '~/components/stats-definition-list';
import TypeLabel from '~/components/type-label';
import { Button } from '~/components/ui/button';

export async function loader({ params }: { params: { id: string } }) {
  const api = new PokemonClient();
  const pokemonId = Number(params.id);
  if (isNaN(pokemonId)) throw new Error('Invalid Pokemon ID');

  const pokemon = await api.getPokemonById(pokemonId);
  const species = await api.getPokemonSpeciesById(pokemonId);

  const res = {
    ...pokemon,
    species,
  };
  return res;
}

export default function PokemonDetail() {
  const pokemon = useLoaderData<typeof loader>();
  const convertSize = (size: number) => size / 10;

  return (
    // 左右にpreviousとnextボタンを配置する
    <article className="grid grid-cols-3 text-lg tracking-wide">
      <section className="col-span-1 flex flex-col gap-5 mr-10 py-5">
        <div>
          {pokemon.sprites.other?.dream_world.front_default && (
            <img
              src={pokemon.sprites.other.dream_world.front_default}
              alt=""
              className="aspect-square lg:w-96"
            />
          )}
        </div>
        <div className="flex">
          <img
            src={pokemon.sprites.front_default ?? ''}
            alt=""
            className="aspect-square w-44"
          />
          {pokemon.sprites.back_default && (
            <img
              src={pokemon.sprites.back_default}
              alt=""
              className="aspect-square w-44"
            />
          )}
        </div>
      </section>

      <section className="col-span-2 flex flex-col gap-4">
        <div className="flex justify-between border-b-2">
          <h1 className="font-semibold">
            <span className="text-xl mr-3">no.{pokemon.id}</span>
            <span className="text-2xl tracking-wider">{pokemon.name}</span>
          </h1>

          <Button variant="ghost">
            <Star />
          </Button>
        </div>

        <section className="px-2">
          <h2 className="mb-2 font-semibold">Overview</h2>

          <div className="grid grid-cols-2">
            <dl className="flex flex-col gap-2">
              <div className="flex gap-4">
                <dd className="min-w-16">type:</dd>
                <dt className="flex gap-3">
                  {pokemon.types.map((type, i) => (
                    <TypeLabel key={i} type={type}></TypeLabel>
                  ))}
                </dt>
              </div>

              <div className="flex gap-4">
                <dt className="min-w-16">genus:</dt>
                <dd>
                  {pokemon.species.genera.map(
                    genus => genus.language.name === 'en' && genus.genus
                  )}
                </dd>
              </div>

              <div className="flex gap-4">
                <dd className="min-w-16">height:</dd>
                <dd>{convertSize(pokemon.height)} m</dd>
              </div>

              <div className="flex gap-4">
                <dt className="min-w-16">weight:</dt>
                <dd>{convertSize(pokemon.weight)} kg</dd>
              </div>
            </dl>

            <dl className="flex flex-col gap-4">
              <div className="flex gap-3">
                <dt className="min-w-24">ability:</dt>
                <dd className="flex flex-col gap-1 tracking-normal">
                  {pokemon.abilities.map(ability => (
                    <span key={ability.slot}>{ability.ability.name}</span>
                  ))}
                </dd>
              </div>

              <div className="flex gap-4">
                <dt className="min-w-24">egg group:</dt>
                <dd className="flex flex-col gap-1">
                  {pokemon.species.egg_groups.map(group => (
                    <span key={group.name}>{group.name}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section>
          <h2 className="mb-2 font-semibold">Stats</h2>

          <div className="flex gap-6">
            <StatsChart stats={pokemon.stats}></StatsChart>
            <StatsDefinitionList stats={pokemon.stats}></StatsDefinitionList>
          </div>
        </section>

        <section>
          <h2 className="mb-2 font-semibold">Species</h2>
          <p>
            {
              pokemon.species.flavor_text_entries
                .filter(
                  entry => entry.language.name === 'en' && entry.flavor_text
                )
                .slice(-1)[0].flavor_text
            }
          </p>
        </section>
      </section>
    </article>
  );
}
