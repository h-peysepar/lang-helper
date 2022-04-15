import { useSession } from 'next-auth/react';
export default function useUserId() {
//   const {
//     data: { user: {_id} },
//   } = 
return  useSession();
//   _id;
}
