import { NextApiRequest, NextApiResponse } from 'next';
import { getDefinition } from '../../../utils/helpers';

export default function hanlder(req: NextApiRequest, res: NextApiResponse) {
  const { word } = req.query;
  getDefinition(word)
    .then(def => res.json({ data: def }))
    .catch(error => res.status(500).json({error, errorMessage: 'something went wrong'}));
}
