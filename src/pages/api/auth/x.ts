import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User, { User as UserType } from '../../../models/user';
import { connectDb } from '../../../utils/withDb';
// [...nextauth]
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { type: 'text' },
        _id: { type: 'string' },
      },
      async authorize({username, password: pass}: any, req: any) {
        if(!username || !pass){
          throw new Error('username and password is required')
        }
        await connectDb()
        const user: UserType | undefined | null = await User.findOne({
          username: username,
          password: pass,
        });
        if (!user) {
          throw new Error("user not fount");
        }
        const { username: uname, _id } = user;
        const tokenData = {username: uname, _id}
        console.log('=>',tokenData)
        return tokenData || null
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },}
});
