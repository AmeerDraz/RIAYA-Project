// pages/PaymentFailed.jsx

import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 max-w-md w-full text-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-3">
                    Payment Failed
                </h1>
                <p className="text-gray-600 text-base sm:text-lg mb-6">
                    Unfortunately, your payment could not be completed. Please
                    try again or check your appointments.
                </p>
                <button
                    onClick={() => navigate("/my-appointments")}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300 w-full sm:w-auto mx-auto"
                >
                    Back to Appointments
                </button>
            </div>
        </div>
    );
};

export default PaymentFailed;
