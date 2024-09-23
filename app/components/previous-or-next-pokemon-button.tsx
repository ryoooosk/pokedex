import { Link } from '@remix-run/react';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PreviousOrNextPokemonButton({
  currentPokemonId,
  direction,
}: {
  currentPokemonId: number;
  direction: 'prev' | 'next';
}) {
  return (
    <Button
      type="button"
      variant="outline"
      className="h-full p-1 sticky top-1/2 text-red-500"
    >
      {direction === 'prev' ? (
        <Link to={`/pokemon/${currentPokemonId - 1}`}>
          <ChevronLeft className="w-7 h-7" />
        </Link>
      ) : (
        <Link to={`/pokemon/${currentPokemonId + 1}`}>
          <ChevronRight className="w-7 h-7" />
        </Link>
      )}
    </Button>
  );
}
