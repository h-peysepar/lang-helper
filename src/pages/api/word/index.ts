import withDb from '../../../utils/withDb';
import { NextApiRequest, NextApiResponse } from 'next';
import Word from '../../../models/word';
import handler from 'next-connect'
import { getDefinition } from '../../../utils/helpers';

const router = handler<NextApiRequest, NextApiResponse>()
router
     .get((req: NextApiRequest, res: NextApiResponse)=>{
          Word.find(
               // {user_id: req.user_id}
          ).then(words => res.json({ data: words })).catch(err => console.log('error: ', err.message)) 
     })
     .post(async (req: NextApiRequest, res: NextApiResponse)=> {
          let { word, definition, defaultDefinition } = req.body
          if (!definition && !defaultDefinition) {
               try {
                    definition = await getDefinition(word)
               } catch (error) {
                    console.log(error)
               }
          }
          const newWord = new Word({
               // user_id: req.user_id,
               word,
               definition: definition || defaultDefinition,
          })
          newWord.save().then((word: any) => res.json({ data: word })).catch((err: any) => console.log(err.message))
     })
export default withDb(router);
