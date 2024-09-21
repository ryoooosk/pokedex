export function getRandomUniqueNumbers(
  count: number,
  min: number,
  max: number
): number[] {
  const numbers = new Set<number>();

  while (numbers.size < count) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    numbers.add(randomNum);
  }

  return Array.from(numbers);
}
