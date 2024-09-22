import { PokemonType } from 'pokenode-ts';

export default function TypeLabel({ type }: { type: PokemonType }) {
  const getAssetImagePath = (name: string): string => `/types/${name}.png`;

  return (
    <span className="flex items-center">
      <img
        src={getAssetImagePath(type.type.name)}
        alt=""
        className="w-7 h-7 aspect-square"
      />

      <span>{type.type.name}</span>
    </span>
  );
}
