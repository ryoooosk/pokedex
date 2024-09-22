import { PokemonStat } from 'pokenode-ts';

export default function StatsDefinitionList({
  stats,
}: {
  stats: PokemonStat[];
}) {
  return (
    <dl className="flex flex-col gap-1 justify-center text-base text-nowrap">
      {stats.map(stat => (
        <div
          key={stat.stat.name}
          className="flex gap-12 first:border-t-2 border-b-2 py-1 px-3"
        >
          <dt className="min-w-32">{stat.stat.name}</dt>
          <dd>{stat.base_stat}</dd>
        </div>
      ))}

      <div className="flex gap-12 mt-2 border-b-2 py-1 px-3">
        <dt className="min-w-32">sum</dt>
        <dd className="font-semibold">
          {stats.reduce((acc, cur) => acc + cur.base_stat, 0)}
        </dd>
      </div>
    </dl>
  );
}
