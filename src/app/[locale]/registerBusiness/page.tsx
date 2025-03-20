import {useTranslations} from 'next-intl';
import RegisterBusinessPage from '@/components/pages/registerBusiness/registerBusinessPage';
import "@/styles/regBusiness.css"

function RegisterBusiness() {
    const t = useTranslations('HomePage');
    return (
      <div>
         <RegisterBusinessPage/>
      </div>
    );
}
export default RegisterBusiness;
