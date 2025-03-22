"use client" 

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import "@/styles/auth.css";
import "@/styles/regBusiness.css";
import SubmitButton from "@/components/ui/submitButton";
import { useRouter } from "next/navigation";

function RegisterBusinessPage() {
  const locale = useTranslations("RegBusiness");  
  const router = useRouter();
  const [countries, setCountries] = useState<{ id: number; name: string }[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    storeName: "",
    appartement: "",
    building: "",
    street: "",
    postalCode: "",
    city: "",
    countryId: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://localhost:5193/api/countries");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(email) ? "" : "Invalid email format");
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
    setPasswordError(
      passwordRegex.test(password)
        ? ""
        : "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, and one special character."
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setSubmitError("Passwords do not match");
      return;
    }

    // Исключаем confirmPassword
    const { confirmPassword, ...requestData } = formData;

    try {
      const response = await fetch("http://localhost:5193/api/account/register-seller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to register business");
      }

      setSubmitSuccess("✅ Registration successful!");
      setTimeout(() => {
        router.push("http://localhost:3000/en"); // Перенаправление на Home Page
      }, 2000);
      
    } catch (error) {
      setSubmitError("❌ Registration failed. Please try again.");
    }
};

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="title">{locale("title")}</div>

      <div className="section-title">Contact information</div>
      <input type="text" placeholder="First name" name="name" required onChange={handleChange} />
      <input type="text" placeholder="Last name" name="surname" required onChange={handleChange} />
      <input
        type="email"
        placeholder="Email"
        name="email"
        required
        onChange={(e) => {
          handleChange(e);
          validateEmail(e.target.value);
        }}
      />
      {emailError && <p className="error-text">{emailError}</p>}
      <input type="tel" placeholder="Business phone" name="phoneNumber" required onChange={handleChange} />

      <div className="section-title">Password</div>
      <div className="info-div">Passwords must be at least 6 characters.</div>
      <input
        type="password"
        placeholder="Password"
        name="password"
        required
        onChange={(e) => {
          handleChange(e);
          validatePassword(e.target.value);
        }}
      />
      {passwordError && <p className="error-text">{passwordError}</p>}
      <input
        type="password"
        placeholder="Confirm Password"
        name="confirmPassword"
        required
        onChange={handleChange}
      />
      {formData.confirmPassword && formData.confirmPassword !== formData.password && (
        <p className="error-text">Passwords do not match</p>
      )}

      <div className="section-title">Business information</div>
      <input type="text" placeholder="Business name" name="storeName" required onChange={handleChange} />

      <div className="section-title">Business address</div>
      <div className="info-div">
        Have multiple locations? Use the address shown on official documents like tax forms.
      </div>
      <input type="text" placeholder="Appartement" name="appartement" onChange={handleChange} />
      <input type="text" placeholder="Building" name="building" required onChange={handleChange} />
      <input type="text" placeholder="Street" name="street" required onChange={handleChange} />
      <input type="text" placeholder="ZIP code" name="postalCode" required onChange={handleChange} />
      <input type="text" placeholder="City" name="city" required onChange={handleChange} />
      <select className="select-input" name="countryId" required onChange={handleChange}>
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.name}
          </option>
        ))}
      </select>
      
      {submitError && <p className="error-text">{submitError}</p>}
      {submitSuccess && <p className="success-text">{submitSuccess}</p>}

      <div className="btn-container">
        <SubmitButton />
      </div>
    </form>
  );
}

export default RegisterBusinessPage;
