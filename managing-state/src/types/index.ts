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

export interface ContactType {
  id: number
  name: string
  email: string
}

export interface ContactWithMessageType extends ContactType {
  message: string
}

export type MessengerState = {
  selectedId: number
  messages: {
    [id: number]: string
  }
}

export type MessengerAction =
  | {
      type: 'changed_selection'
      contactId: number
    }
  | {
      type: 'edited_message'
      message: string
    }
  | {
      type: 'sent_message'
    }

export type PlaceType = {
  id: number
  name: string
  description: string
  imageId: string
}

export type TaskType = {
  id: number
  text: string
  done: boolean
}

export type TaskAction =
  | {
      type: 'added'
      id: number
      text: string
    }
  | {
      type: 'changed'
      task: TaskType
    }
  | {
      type: 'deleted'
      id: number
    }
