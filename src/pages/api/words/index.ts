import withDb from '../../../utils/withDb';
import { NextApiRequest, NextApiResponse } from 'next';
import Word from '../../../models/word';
import handler from 'next-connect';
import { getDefinition } from '../../../utils/helpers';
import withProtect from '../../../utils/withProtect';
// const Word = {};
const router = handler<NextApiRequest, NextApiResponse>();
router
  .get((req: NextApiRequest, res: NextApiResponse) => {
    // console.log({ req: req.user_id, cok: req.cookies,value: res.id, value1: req.id });
    console.log('=>>>', req.cookies?.user_id);
    // res.json({ hibabe: true });
    Word.find({ user_id: req.cookies?.user_id })
      .then(words => res.json({ data: words }))
      .catch(err => console.log('error: ', err.message));
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    let { word, definition, defaultDefinition } = req.body;
    if (!definition && !defaultDefinition) {
      try {
        definition = await getDefinition(word);
      } catch (error) {
        console.log(error);
      }
    }
    const newWord = new Word({
      user_id: req.cookies.user_id,
      word,
      definition: definition || defaultDefinition,
    });
    newWord
      .save()
      .then((word: any) => {console.log(word);res.json({ data: word })})
      .catch((err: any) => console.log(err.message));
  });
export default withProtect(withDb(router));
