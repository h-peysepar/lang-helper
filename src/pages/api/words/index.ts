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
