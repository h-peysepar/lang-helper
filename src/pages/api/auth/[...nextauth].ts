import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User, { User as UserType } from '../../../models/user';
import { connectDb } from '../../../utils/withDb';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize({username, password: pass}: any, req: any) {
        //connect to db
        if(!username || !pass){
          throw new Error('username and password is required')
        }
        await connectDb()
        const user: UserType | undefined | null = await User.findOne({
          username: username,
          password: pass,
        });
        console.log(user)
        if (!user) {
          throw new Error("user not fount");
        }
        const { password, ...data } = user;
        return data;
      },
    }),
  ],
});
