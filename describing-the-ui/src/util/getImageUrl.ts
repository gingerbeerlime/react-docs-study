interface Person {
  name: string
  imageId: string
}

export function getImageUrl(person: Person) {
  return 'https://i.imgur.com/' + person.imageId + 's.jpg'
}
