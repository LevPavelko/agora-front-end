import { useTranslations } from 'next-intl';
import RegisterUserPage from '@/components/pages/registerUser/registerUser';
import "@/styles/regUser.css";

function RegisterUser() {
    const t = useTranslations('HomePage');
    return (
        <div>
            <RegisterUserPage />
        </div>
    );
}
export default RegisterUser;
