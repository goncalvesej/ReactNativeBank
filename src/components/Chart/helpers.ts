export const normalizeName = (name: string) => {
  const index = name.search(/[^A-Za-z]/)

  return name.substr(0, index > 0 ? index : name.length)
}
