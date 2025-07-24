
import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { backendUrl, token } = useContext(AppContext); 
    const searchParams = new URLSearchParams(location.search);
    const appointmentId = searchParams.get("appointmentId");

    useEffect(() => {
        const confirmPayment = async () => {
            if (!appointmentId) return;

            try {
                await axios.post(
                    `${backendUrl}/api/user/confirm-payment`,
                    { appointmentId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                toast.success("✅ Payment confirmed successfully.");
            } catch (error) {
                console.error("❌ Payment confirmation error:", error);
                toast.error("❌ Error confirming payment.");
            }
        };

        confirmPayment();
    }, [appointmentId, backendUrl, token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-6 bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg max-w-xl w-full p-6 sm:p-10 mx-auto">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-primary mb-6 text-center">
                    Payment Successful
                </h1>
                <p className="text-base sm:text-lg mb-8 text-gray-700 text-center">
                    Your appointment has been confirmed.
                </p>
                <button
                    onClick={() => navigate("/my-appointments")}
                    className="w-full sm:w-full bg-primary hover:opacity-85 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300 mx-auto"
                >
                    Go to My Appointments
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
