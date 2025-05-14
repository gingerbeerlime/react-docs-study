export interface LetterType {
  id: number
  subject: string
  isStarred: boolean
}

export interface FoodType {
  id: number
  name: string
  description: string
}

export type ContactType = {
  id: number
  name: string
  email: string
}
