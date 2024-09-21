import { Card, CardContent } from './ui/card';
import { Pokemon } from 'pokenode-ts';

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Card className="text-center group transition-shadow hover:shadow-xl">
      <CardContent className="p-4">
        <img
          className="w-full aspect-square transition-transform duration-300 ease-in-out transform group-hover:scale-110"
          src={pokemon.sprites.front_default ?? ''}
          alt={pokemon.name}
        />
      </CardContent>
    </Card>
  );
}
