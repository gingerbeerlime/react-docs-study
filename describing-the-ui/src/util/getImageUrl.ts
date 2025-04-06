interface Person {
  imgId: string
}

export function getImageUrl(
  person: Person,
  size: 's' | 'm' | 'l' = 's',
): string {
  return 'https://i.imgur.com/' + person.imgId + size + '.jpg'
}
