export function random(number) {
  return Math.ceil(Math.random() * number);
}

export function duplicatedShadow(shadowColor, numDuplicates, xMax, yMax) {
  const generateDuplicate = () => `${random(xMax)}px ${random(yMax)}px ${shadowColor}`;

  let result = `${generateDuplicate()}`;

  for (let i = 1; i < numDuplicates; i++)
    result += `, ${generateDuplicate()}`;

  return result;
}
