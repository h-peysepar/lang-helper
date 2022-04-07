import axios from 'axios';

export function getDefinition(word: string) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fa&hl=en-US&dt=t&dt=bd&dj=1&q=${word}`;
  return axios
    .get(url)
    .then(({ data }: { data: any }) => data.sentences[0].trans);
}
// export function errorMaker(message: string, code = 500) {
//   const err = new Error(message)
//   err. = code;
//   return err
// }
