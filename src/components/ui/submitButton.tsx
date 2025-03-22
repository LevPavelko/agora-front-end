"use client";

import "@/styles/auth.css";
import { useTranslations } from "next-intl";



function SubmitButton() {
  const locale = useTranslations("Auth");

  return (
    <div>
      <input
        type="submit"
        name="submit"
        className="submit-btn"
        value={locale("continue")}
        
      />
    </div>
  );
}

export default SubmitButton;
