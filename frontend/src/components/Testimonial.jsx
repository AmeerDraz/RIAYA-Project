import React, { useState } from "react";
import { assets, testimonials } from "../assets/assets"; // Your static data
import axios from "axios";
import { toast } from "react-toastify";

export default function Testimonial() {
    const [index, setIndex] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        text: "",
    });

    const total = testimonials.length + 1; // Add 1 for the review form card

    const handlePrev = () => {
        setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    };

    const handleNext = () => {
        setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post("/api/testimonial/add", {
                ...formData,
                image: "/anonymous-avatar.png",
            });

            if (data.success) {
                toast.success("Your testimonial has been submitted!");
                setFormData({ name: "", location: "", text: "" });
                setModalOpen(false);
            } else {
                toast.error(data.message || "Submission failed.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error submitting testimonial.");
        }
    };

    const isReviewCard = index === 1; // Show "Write a Review" card as second slide

    const { name, location, text, image } = !isReviewCard
        ? testimonials[index < 1 ? index : index - 1] // Adjust index to skip review card
        : {
              name: "Anonymous",
              location: "",
              text: "Write your own review and share your experience with us!",
              image: assets.upload_area,
          };

    return (
        <section className="bg-white py-8 md:py-8 min-h-[320px] max-h-[320px] overflow-hidden">
            <div className="max-w-5xl mx-auto relative flex items-center justify-center px-4">
                {/* Left Arrow */}
                <button
                    onClick={handlePrev}
                    className="absolute left-0 md:left-[-40px] lg:left-[-56px] top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 z-10 text-2xl ml-2"
                >
                    ‹
                </button>

                {/* Content */}
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-10 w-full max-w-3xl mx-auto text-center md:text-left">
                    {/* Image */}
                    <img
                        src={image}
                        alt={name}
                        className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover shadow-lg flex-shrink-0"
                    />

                    {/* Text */}
                    <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                            What Our Client Says
                        </h2>
                        <p className="text-teal-600 font-medium mb-4">
                            Testimonials
                        </p>
                        <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base lg:text-lg leading-relaxed min-h-20 max-h-20 overflow-scroll">
                            {text}
                        </p>
                        <div className="text-sm lg:text-base font-bold text-gray-800">
                            {name}
                        </div>
                        {location && (
                            <div className="text-xs lg:text-sm text-gray-500">
                                {location}
                            </div>
                        )}
                        {isReviewCard && (
                            <button
                                onClick={() => setModalOpen(true)}
                                className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
                            >
                                Add Your Review
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Arrow */}
                <button
                    onClick={handleNext}
                    className="absolute right-0 md:right-[-40px] lg:right-[-56px] top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 z-10 text-2xl mr-2"
                >
                    ›
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <form
                        onSubmit={handleFormSubmit}
                        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
                    >
                        <h2 className="text-xl font-bold text-center">
                            Submit Your Testimonial
                        </h2>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full border px-3 py-2 rounded"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    name: e.target.value,
                                })
                            }
                            required
                        />
                        <input
                            type="text"
                            placeholder="Your Location"
                            className="w-full border px-3 py-2 rounded"
                            value={formData.location}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    location: e.target.value,
                                })
                            }
                            required
                        />
                        <textarea
                            placeholder="Write your testimonial..."
                            className="w-full border px-3 py-2 rounded min-h-[120px]"
                            rows="4"
                            value={formData.text}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    text: e.target.value,
                                })
                            }
                            required
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </section>
    );
}
