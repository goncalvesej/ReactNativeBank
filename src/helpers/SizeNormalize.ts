import { Dimensions } from 'react-native'

const guidelineBaseWidth = 350

const { width } = Dimensions.get('window')

const scale = (size: number) => {
  return (width / guidelineBaseWidth) * size
}

const factor = 0.5
export default (size: number = 10) => {
  return size + (scale(size) - size) * factor
}
