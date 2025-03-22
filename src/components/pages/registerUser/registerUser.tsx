"use client"

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/ui/submitButton";
import "@/styles/regUser.css";

function RegisterUserPage() {
    const locale = useTranslations("RegisterUser");
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    });

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [submitError, setSubmitError] = useState("");
    const [submitSuccess, setSubmitSuccess] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                : "Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, and a special character."
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

        const { confirmPassword, ...requestData } = formData;

        try {
            const response = await fetch("http://localhost:5193/api/account/register-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error("Failed to register user");
            }

            setSubmitSuccess("✅ Registration successful!");
            setTimeout(() => {
                router.push("/en"); // Перенаправление на страницу входа
            }, 2000);
        } catch (error) {
            setSubmitError("❌ Registration failed. Please try again.");
        }
    };

    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="title">{locale("title")}</div>

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
            <input type="tel" placeholder="Phone number" name="phoneNumber" required onChange={handleChange} />

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

            {submitError && <p className="error-text">{submitError}</p>}
            {submitSuccess && <p className="success-text">{submitSuccess}</p>}

            <div className="btn-container">
                <SubmitButton />
            </div>
        </form>
    );
}

export default RegisterUserPage;
