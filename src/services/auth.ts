// services/auth.ts
export async function login(email: string, password: string): Promise<Response> {
    return await fetch("http://localhost:5193/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
  }
  