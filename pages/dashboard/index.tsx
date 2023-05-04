import useCurrentUser from '@/hooks/useCurrentUser'
import { signOut } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';

export default function DashboardHome() {
  const {data:currentUser} = useCurrentUser();
  const router = useRouter();

  const handleSignOut = () => {
    if(currentUser){
      signOut();
    }
  }

  useEffect(()=>{
   if(!currentUser){
     router.push('/')
   }
  },[currentUser, router])

  return (
    <>
      <div>DashboardHome</div>
      <button type='button' onClick={()=>handleSignOut()} >Log out</button>
    </>
  )
}
