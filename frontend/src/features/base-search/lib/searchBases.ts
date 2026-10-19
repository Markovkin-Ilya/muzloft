const normalizeName = (value: string) =>
  value.trim().toLocaleLowerCase("ru-RU").replace(/ё/g, "е");

const getEditDistance = (first: string, second: string) => {
  const distances = Array.from({ length: first.length + 1 }, (_, index) =>
    Array.from({ length: second.length + 1 }, (_, secondIndex) =>
      secondIndex === 0 ? index : 0,
    ),
  );

  for (let index = 0; index <= second.length; index += 1) {
    distances[0][index] = index;
  }

  for (let firstIndex = 1; firstIndex <= first.length; firstIndex += 1) {
    for (let secondIndex = 1; secondIndex <= second.length; secondIndex += 1) {
      distances[firstIndex][secondIndex] = Math.min(
        distances[firstIndex - 1][secondIndex] + 1,
        distances[firstIndex][secondIndex - 1] + 1,
        distances[firstIndex - 1][secondIndex - 1] +
          (first[firstIndex - 1] === second[secondIndex - 1] ? 0 : 1),
      );
    }
  }

  return distances[first.length][second.length];
};

const getNameMatchScore = (name: string, query: string) => {
  if (name === query) {
    return 3;
  }

  if (name.startsWith(query)) {
    return 2;
  }

  const matchPosition = name.indexOf(query);
  if (matchPosition >= 0) {
    return 1 + 1 / (matchPosition + 1);
  }

  let bestScore = 0;
  const minLength = Math.max(1, query.length - 1);
  const maxLength = query.length + 1;

  for (let start = 0; start < name.length; start += 1) {
    for (
      let length = minLength;
      length <= maxLength && start + length <= name.length;
      length += 1
    ) {
      const candidate = name.slice(start, start + length);
      const score =
        1 -
        getEditDistance(candidate, query) /
          Math.max(candidate.length, query.length);
      bestScore = Math.max(bestScore, score);
    }
  }

  return bestScore * 0.99;
};

export const searchBasesByName = <T extends { title: string }>(
  bases: T[],
  value: string,
): T[] => {
  const query = normalizeName(value);

  if (!query) {
    return bases;
  }

  return [...bases].sort((first, second) => {
    const firstScore = getNameMatchScore(normalizeName(first.title), query);
    const secondScore = getNameMatchScore(normalizeName(second.title), query);

    return secondScore - firstScore;
  });
};
