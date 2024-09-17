import { Link } from '@remix-run/react';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className=" bg-yellow-400 text-white h-12 flex justify-between items-center px-5 w-full">
      <Link to="/" className="text-red-600 font-bold tracking-wide text-lg">
        Pokedex demo
      </Link>

      <Button
        type="button"
        variant="ghost"
        className="h-8 font-semibold tracking-wide bg-slate-100 text-gray-950 hover:bg-white"
      >
        SignUp
      </Button>
    </header>
  );
}
