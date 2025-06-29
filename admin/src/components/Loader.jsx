import React from "react";

const Loader = () => {
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                <div className="ease-linear rounded-full border-8 border-t-8 border-gray-200 border-t-primary h-16 w-16 animate-spin"></div>
            </div>
        </div>
    );
};

export default Loader;
