import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './ui/chart';
import { PokemonStat } from 'pokenode-ts';

export default function StatsChart({ stats }: { stats: PokemonStat[] }) {
  const chartConfig = {
    point: {
      label: 'point',
      color: '#DC2626',
    },
  } satisfies ChartConfig;

  const getStatsData = (stats: PokemonStat[]) => {
    const res = stats.map(stat => {
      return { name: stat.stat.name, point: stat.base_stat };
    });

    return res;
  };

  const getOmittedStatName = (name: string): string => {
    switch (name) {
      case 'hp':
        return 'HP';
      case 'attack':
        return 'atc';
      case 'defense':
        return 'def';
      case 'special-attack':
        return 's-at';
      case 'special-defense':
        return 's-df';
      case 'speed':
        return 'spd';
      default:
        return name;
    }
  };

  return (
    <ChartContainer config={chartConfig} className="min-h-52 min-w-60">
      <RadarChart data={getStatsData(stats)}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis
          dataKey="name"
          tickFormatter={(value: string) => getOmittedStatName(value)}
        />
        <PolarGrid />
        <Radar dataKey="point" fill="var(--color-point)" fillOpacity={0.6} />
        <PolarRadiusAxis
          angle={60}
          stroke="hsla(var(--foreground))"
          orientation="middle"
          axisLine={false}
          domain={[0, 155]}
        />
      </RadarChart>
    </ChartContainer>
  );
}
