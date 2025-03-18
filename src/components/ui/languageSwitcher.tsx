"use client";

import { useRouter, usePathname } from "next/navigation";
import { ChangeEvent } from "react";
import "@/styles/auth.css";

const languages = [
  { code: "en", label: "English"},
  { code: "de", label: "Deutsch"},
  { code: "fr", label: "Franch"},
  { code: "ua", label: "Ukrain"},
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    router.push(`/${newLocale}${pathname.replace(/^\/[a-z]{2}/, "")}`);
  };

  return (
    <div className="language-select-div">
      <select onChange={changeLanguage} defaultValue={pathname.split("/")[1]} className="language-select">
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className="language-option">
            {lang.label}
          </option>
        ))}
      </select>
    </div> 
   
  
  );
  
}
 







