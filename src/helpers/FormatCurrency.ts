export default (text: string) => {
  const value = Number(text.replace(/\D/g, ''))
  let amount = ''
  const valueStr = value.toString()
  if (value >= 100) {
    const size = valueStr.length
    amount = `${valueStr.substr(0, size - 2)},${valueStr.substr(size - 2, size - 1)}`
  } else if (value >= 10) {
    amount = `${0},${valueStr}`
  } else {
    amount = `${0},0${valueStr}`
  }
  return amount
}
