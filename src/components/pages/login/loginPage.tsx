import {useTranslations} from 'next-intl';
import Image from 'next/image';
import "@/styles/auth.css";
import SubmitButton from '@/components/ui/submitButton';

function LoginPage() {
    const locale = useTranslations('Auth');
    return (
      <div className='main-div'>
        {/* <h1>{locale('title')}</h1> */}
        
        <div className="right-section">
            <div className='center-div'>
                <div className='form-div'>
                <h1>{locale('title')}</h1>
                    <form>
                        <input placeholder='Email' type='email' name='email'></input>
                        <input placeholder='Password' type='password' name='password'></input>

                        <div className="remember-forgot">
                            <div className="checkbox-container">
                                <input type="checkbox" id="rememberMe" name="rememberMe" className="checkbox" />
                                <label htmlFor="rememberMe">{locale('rememberMe')}</label>
                            </div>
                            <a href="#" className="forgot-password">{locale('forgetPassword')}</a>
                        </div>
                        <div className='btn-container'>
                            <SubmitButton/>
                        </div>
                        <div className="separator">
                            <div className="line"></div>
                            <span className="or">or</span>
                            <div className="line"></div>
                        </div>
                        <div className='btn-container'>
                            <button className="social-btn google">
                                <Image src="/google_logo.webp" alt="Google logo" width={20} height={20} />
                                {locale("continueWithGoogle")}
                            </button>
                           
                        </div>
                        <p>{locale("dontHaveAccount")} <a href="#">{locale("signUp")}</a></p>

                    </form>
                </div>
                
            </div>
        </div>

      
        <div className="left-section">
            <Image src="/52b77e8ceb16e0801b375cb91226bde0.jpeg" alt="Sunflowers" layout="fill" objectFit="cover" />
        </div>
      </div>
        
    );
}
export default LoginPage;