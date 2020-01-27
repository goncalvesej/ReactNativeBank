const fakeBase64 = '../../resources/img/eraldo.jpg'

export const fakeGetPictureBase64 = (token: string) => {
  return require(fakeBase64)
}
