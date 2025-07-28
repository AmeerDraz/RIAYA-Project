import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [URLSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/api/user/reset-password/${URLSearchParams.get("token")}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ password }),
                }
            );

            const data = await res.json();
            if (res.ok) {
                alert("Password reset successfully!");
                navigate("/login");
            } else {
                alert(data.message || "Invalid or expired link.");
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mt-10 p-6 border rounded shadow"
        >
            <h2 className="text-xl font-bold mb-4">Reset Password</h2>
            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full rounded mb-4"
                required
            />
            <button
                type="submit"
                className="bg-primary text-white py-2 w-full rounded"
            >
                Reset Password
            </button>
        </form>
    );
};

export default ResetPassword;
