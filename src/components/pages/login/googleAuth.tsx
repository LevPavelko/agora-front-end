"use client";

import Image from 'next/legacy/image';
import "@/styles/auth.css";
import { signIn } from "next-auth/react";
import {useTranslations} from 'next-intl';

const handleGoogleSignIn = async () => {
 
  const result = await signIn("google",  { callbackUrl: "/" });
  console.log("Sign-in result:", result);
};

function GoogleAuth() {
  
    const locale = useTranslations('Auth');
    return (
      <div>
        <button type='button' className="social-btn google" onClick={handleGoogleSignIn}>
        <Image src="/google_logo.webp" alt="Google logo" width={20} height={20} />
           {locale("continueWithGoogle")}
       </button>
                                       
      </div>
    );
  }
export default GoogleAuth;
