import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useCurrentUser } from "./useCurrentUser"

export function useRequireLogin() {
  const { isAuthChecking, currentUser } = useCurrentUser()
  const router = useRouter()
  
  useEffect(()=>{
    console.info(currentUser)

    if(isAuthChecking) return // まだ確認中
    if(!currentUser) router.push("/login") // 未ログインだったのでリダイレクト
  },[isAuthChecking, currentUser])
}

