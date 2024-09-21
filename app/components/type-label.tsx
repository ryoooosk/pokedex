import { PokemonType } from 'pokenode-ts';

export default function TypeLabel({ type }: { type: PokemonType }) {
  const getAssetImagePath = (name: string): string => `/types/${name}.png`;

  return (
    <div className="flex items-center gap-2">
      <dd>
        <img
          src={getAssetImagePath(type.type.name)}
          alt=""
          className="w-6 h-6 aspect-square"
        />
      </dd>
      <dt className="text-sm font-normal">{type.type.name}</dt>
    </div>
  );
}
