import Word from '../../../models/word';
import withDb, { routeHandler } from '../../../utils/withDb';
const handler = routeHandler({
  GET(req, res, db) {
    res.json({
      data: db.data?.words.filter(word => word.user_id === req.cookies.user_id),
    });
  },
  POST: async (req, res, db) => {
    let { word, definition, defaultDefinition } = req.body;
    const newWord = new Word(
      word,
      req.cookies.user_id,
      definition || defaultDefinition || undefined
    );
    await newWord.gen();
    db.data?.words.push(newWord);
    await db.write();
    res.json({ data: newWord });
  },
});
export default handler;
// import { NextApiRequest, NextApiResponse } from 'next';
// // import Word from '../../../models/word';
// import { getDefinition, routeHandler } from '../../../utils/helpers';
// import withProtect from '../../../utils/withProtect';
// const handler = routeHandler({
//   GET(req, res, db){
//     console.log('!@#', db)
//     db.data?.words.filter(word => word.user_id === 'a132456')
//   }
// })
// .get((req: NextApiRequest, res: NextApiResponse) => {
//   Word.find({ user_id: req.cookies?.user_id })
//     .then(words => res.json({ data: words }))
//     .catch(err => {});
// })
// .post(async (req: NextApiRequest, res: NextApiResponse) => {
//   let { word, definition, defaultDefinition } = req.body;
//   if (!definition && !defaultDefinition) {
//     try {
//       definition = await getDefinition(word);
//     } catch (error) {

//     }
//   }
//   const newWord = new Word({
//     user_id: req.cookies.user_id,
//     word,
//     definition: definition || defaultDefinition,
//   });
//   newWord
//     .save()
//     .then((word: any) => res.json({ data: word }))
//     .catch((err: any) => {});
// });
// export default withProtect(withDb(handler));
