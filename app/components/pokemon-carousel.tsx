import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import PokemonCard from './pokemon-card';
import { Pokemon } from 'pokenode-ts';
import { Link } from '@remix-run/react';

export default function PokemonCarousel({ pokemons }: { pokemons: Pokemon[] }) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent>
        {pokemons.map((pokemon, i) => (
          <CarouselItem key={i} className="basis-1/5">
            {/* // TODO: アクセシビリティ対策する/\ */}
            <Link to={`/pokemon/${pokemon.id.toString()}`} className="inset-0">
              <PokemonCard pokemon={pokemon}></PokemonCard>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
