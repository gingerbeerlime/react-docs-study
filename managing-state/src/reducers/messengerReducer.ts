import { MessengerState, MessengerAction } from '../types'

export const initialState = {
  selectedId: 0,
  messages: {
    0: 'Hello Taylor',
    1: 'Hello Alice',
    2: 'Hello Bob',
  },
}

export function messengerReducer(state: MessengerState, action: MessengerAction) {
  switch (action.type) {
    case 'changed_selection': {
      return {
        ...state,
        selectedId: action.contactId,
      }
    }
    case 'edited_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: action.message,
        },
      }
    }
    case 'sent_message': {
      return {
        ...state,
        messages: {
          ...state.messages,
          [state.selectedId]: '',
        },
      }
    }
    default: {
      const _exhaustiveCheck: never = action
      throw Error('Unknown action')
    }
  }
}
