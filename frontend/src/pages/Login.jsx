import React, { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://online-lecture-scheduling-iq89.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.msg || "Login failed");
        setLoading(false);
        return;
      }
      onLogin(data.user);
      localStorage.setItem("token", data.token);
    } catch (err) {
      alert("Error connecting to server");
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-stone-900 mb-3">LOGIN</h1>
          <p className="text-sm font-bold text-stone-600">
            ENTER YOUR CREDENTIALS TO CONTINUE
          </p>
        </div>

        <div className="bg-white border-4 border-stone-900 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-xs font-black text-stone-900 mb-2 tracking-wide">
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 outline-none font-bold text-stone-900 placeholder-stone-400"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-black text-stone-900 mb-2 tracking-wide">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-stone-300 focus:border-stone-900 outline-none font-bold text-stone-900 placeholder-stone-400"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-stone-900 text-white py-4 font-black text-sm hover:bg-stone-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </button>
          </form>

          <div className="bg-stone-100 border-t-2 border-stone-900 px-8 py-4">
            <p className="text-xs font-bold text-stone-600 text-center">
              Demo: Register via POST /api/auth/register
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs font-bold text-stone-500">
            SECURE LOGIN • ENCRYPTED CONNECTION
          </p>
        </div>
      </div>
    </div>
  );
}
