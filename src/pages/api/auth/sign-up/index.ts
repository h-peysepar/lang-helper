import { NextApiRequest, NextApiResponse } from 'next';
import User, { User as UserType } from '../../../../models/user';
import { connectDb } from '../../../../utils/withDb';

export default async function handler(req: NextApiRequest, res: NextApiResponse){
     const { username, password, confirm_password, ...others } = req.body || {}
     if (!Object.keys(others))
     return res.status(422).json({hasError: true})
     if(password !== confirm_password){
          return res.status(422).json({hasError: true, errorMessage: 'Password dosn\'t match confirm password'})
     }
     await connectDb()
     try {
          const user = await User.findOne({username})
          if(user){
               // return next(errorMaker('This username already exist!', 409))
               res.status(409).send('This username already exist!')
          } 
     } catch (err) {
          // return next(err)
          console.log(err)
          res.status(409).send('unexpected error has occured!')
     }
     console.log({username, password})
     const user = new User({username, password})
     user.save().then((user: UserType) => res.json({ success: true, data: { user } }))
}