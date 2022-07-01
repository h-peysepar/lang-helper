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
    Word.find({ user_id: req.cookies?.user_id })
      .then(words => res.json({ data: words }))
      .catch(err => {});
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    let { word, definition, defaultDefinition } = req.body;
    if (!definition && !defaultDefinition) {
      try {
        definition = await getDefinition(word);
      } catch (error) {
        
      }
    }
    const newWord = new Word({
      user_id: req.cookies.user_id,
      word,
      definition: definition || defaultDefinition,
    });
    newWord
      .save()
      .then((word: any) => res.json({ data: word }))
      .catch((err: any) => {});
  });
export default withProtect(withDb(router));
