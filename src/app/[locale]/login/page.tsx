import {useTranslations} from 'next-intl';
import LoginPage from '@/components/pages/login/loginPage';
import "@/styles/auth.css"

function Login() {
    const t = useTranslations('HomePage');
    return (
      <div>
        {/* <h1>{t('title')}</h1> */}
       
        <LoginPage/>
      </div>
    );
}
export default Login;
