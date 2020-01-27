const bilbo = require('../resources/img/bilbo.jpg')
const legolas = require('../resources/img/legolas.jpg')
const frodo = require('../resources/img/frodo.jpg')
const galadriel = require('../resources/img/galadriel.jpg')
const gandalf = require('../resources/img/gandalf.jpg')
const missandei = require('../resources/img/missandei.jpg')
const ragnar = require('../resources/img/ragnar.jpg')
const lagertha = require('../resources/img/lagertha.jpg')
const samwell = require('../resources/img/samwell.jpg')
const tauriel = require('../resources/img/tauriel.jpg')

export const fakeLoadContactPicture = (id: number) => {
  switch (id) {
    case 1:
      return bilbo
    case 2:
      return legolas
    case 3:
      return frodo
    case 4:
      return null // Daenerys
    case 5:
      return galadriel
    case 6:
      return gandalf
    case 7:
      return missandei
    case 8:
      return null // John Snow
    case 9:
      return lagertha
    case 10:
      return samwell
    case 11:
      return null // Smaug
    case 12:
      return tauriel
    case 13:
      return null // Tyrion
    case 14:
      return null // Ivar
    case 15:
      return null // Cersei
    case 16:
      return ragnar
    default:
      return null
  }
}
