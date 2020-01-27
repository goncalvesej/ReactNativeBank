import { delay } from 'redux-saga/effects'
import { Contact } from '../store/transfer/types'

export const fakeGetContactsRequest = (): Array<Contact> => {
  return contacts
}

const contacts: Contact[] = [
  {
    id: 1,
    name: 'Bilbo Bolseiro',
    phone: '(11)999-5210-123'
  },
  {
    id: 2,
    name: 'Legolas',
    phone: '(11)999-9921-520'
  },
  {
    id: 3,
    name: 'Frodo',
    phone: '(11)999-521-960'
  },
  {
    id: 4,
    name: 'Daenerys',
    phone: '(11)999-2592-910'
  },
  {
    id: 5,
    name: 'Galadriel',
    phone: '(11)999-9921-0210'
  },
  {
    id: 6,
    name: 'Gandalf, O Cinzento',
    phone: '(11)999-9921-0210'
  },
  {
    id: 7,
    name: 'Missandei',
    phone: '(11)999-9921-0665'
  },
  {
    id: 8,
    name: 'John Snow',
    phone: '(11)999-9921-3322'
  },
  {
    id: 9,
    name: 'Lagertha',
    phone: '(11)999-9921-0000'
  },
  {
    id: 10,
    name: 'Samwell',
    phone: '(11)999-3368-984'
  },
  {
    id: 11,
    name: 'Smaug',
    phone: '(11)999-9921-6333'
  },
  {
    id: 12,
    name: 'Tauriel',
    phone: '(11)999-1221-0214'
  },
  {
    id: 13,
    name: 'Tyrion',
    phone: '(11)999-7221-0218'
  },
  {
    id: 14,
    name: 'Ivar',
    phone: '(11)999-5305-9871'
  },
  {
    id: 15,
    name: 'Cersei',
    phone: '(11)999-0028-667'
  },
  {
    id: 16,
    name: 'Ragnar',
    phone: '(11)997-2514-475'
  }
]
