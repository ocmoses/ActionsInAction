"use client";
import { useEffect } from "react";
import useApp from "@/hooks/useApp";
import useLogout from "@/hooks/useLogout";
import {useIdleTimer} from "react-idle-timer";
 

export default function Session({
  children,
  serverSession,
  categories,
  error,
}) {
  const app = useApp();
  const { Logout, clearStore } = useLogout();

  let timeout = null;

  // console.log("process.env.NEXT_PUBLIC_IDLE_TIMEOUT", process.env.NEXT_PUBLIC_IDLE_TIMEOUT);
  
  const resetIdleTimer = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      alert("Session expired :(")
      Logout();
      window.location.reload();
    }, process.env.NEXT_PUBLIC_IDLE_TIMEOUT);
    // process.env.NEXT_PUBLIC_IDLE_TIMEOUT
  }

  const watchForIdleness = () => {
    ['click','ontouchstart', 'mousemove', 'keydown', 'wheel', 
      'touchmove', 'visibilitychange', 'MSPointerDown', 
      'MSPointerMove', 'onload'].forEach( evt => 
      window.addEventListener(evt, resetIdleTimer, false)
    );
  }

   
  const goToDashboard = () => {
    if(window != undefined && window != null){
      if(window.location.pathname.includes('admin/login')){
        window.location = '/admin/dashboard';
        return;
      }
      if(window.location.pathname.includes('login')){
        window.location = '/dashboard';
        return;
      }
    }
  }

  
  useEffect(() => {
    // clearStore();
    if (serverSession) {
      if (serverSession?.status === "authenticated") {        
        app.setStoreStates(serverSession, categories, "session");
        goToDashboard();

        resetIdleTimer();
        watchForIdleness();

      }
    }
    if (error) app.setGlobalError(error);
  }, [serverSession, error]);
  

  return <>{children}</>;
}
