const endings = ['!', '?', '.', '...'];

export const genEnding = (): string => {
  const rand = Math.floor(Math.random() * endings.length);
  return endings[rand] ?? ' uh oh';
};
