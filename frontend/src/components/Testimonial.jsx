
import React, { useState, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { Pencil } from "lucide-react";

function Testimonial() {
    const [index, setIndex] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        text: "",
        location: "",
    });
    const [testimonialList, setTestimonialList] = useState([]);

    const { backendUrl, token, userData } = useContext(AppContext);

    const fetchTestimonials = async () => {
        try {
            const { data } = await axios.get(
                `${backendUrl}/api/user/testimonial/list`
            );
            if (data.success) {
                setTestimonialList(data.testimonials);
            }
        } catch (error) {
            toast.error("Failed to load testimonials.");
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const total = testimonialList.length + 1;

    const handlePrev = () => {
        setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    };

    const handleNext = () => {
        setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    };

    const handleFormOpen = (testimonial = null) => {
        if (testimonial) {
            setEditId(testimonial._id);
            setFormData({
                title: testimonial.title || "",
                text: testimonial.text || "",
                location: testimonial.location || "",
            });
        } else {
            setEditId(null);
            setFormData({
                title: "",
                text: "",
                location: userData?.address?.line1 || "",
            });
        }
        setModalOpen(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editId
                ? `${backendUrl}/api/user/testimonial/update/${editId}`
                : `${backendUrl}/api/user/testimonial/add`;

            const method = editId ? "put" : "post";

            const { data } = await axios[method](
                url,
                {
                    title: formData.title,
                    text: formData.text,
                    location: formData.location,
                },
                {
                    headers: { token },
                }
            );

            if (data.success) {
                toast.success(editId ? "Review updated!" : "Review submitted!");
                setFormData({ title: "", text: "", location: "" });
                setEditId(null);
                setModalOpen(false);
                fetchTestimonials();
            } else {
                toast.error(data.message || "Submission failed.");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Error submitting testimonial."
            );
        }
    };

    const userHasTestimonial = testimonialList.some(
        (t) => t.user?._id === userData?._id
    );

    const isReviewCard = index === 1;
    const current = !isReviewCard
        ? testimonialList[index < 1 ? index : index - 1] || {}
        : {
              user: {
                  name: "Anonymous",
                  image: assets.upload_area,
                  address: { line1: "" },
              },
              title: "",
              text: "Write your own review and share your experience with us!",
          };

    const { user = {}, title = "", text = "" } = current;
    const location = user.address?.line1 || "";

    // قص 400 كلمة كحد أقصى
    const trimmedText =
        text.split(" ").slice(0, 400).join(" ") +
        (text.split(" ").length > 400 ? "..." : "");

    return (
        <section className="bg-white py-8 md:py-10 min-h-[400px] max-h-[480px] w-full max-w-5xl mx-auto overflow-hidden px-4">
            <div className="relative flex items-center justify-center gap-4">
                {/* Prev Button */}
                <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="flex items-center justify-center w-12 h-12 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition select-none font-bold"
                >
                    ‹
                </button>

                {/* Content between buttons */}
                <div className="flex flex-col justify-center md:flex-row items-center gap-8 w-full max-w-3xl">
                    {/* User Image */}
                    <div className="">
                        <img
                            src={user.image || "/anonymous-avatar.png"}
                            alt={user.name || "Anonymous"}
                            className="w-28 h-28 rounded-full object-cover flex-shrink-0 object-top"
                        />
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col flex-1 min-w-0 ">
                        <h2 className="text-3xl font-extrabold mb-1 text-gray-900">
                            What Our Client Says
                        </h2>
                        <p className="text-teal-600 font-semibold mb-3 uppercase tracking-wide">
                            Testimonials
                        </p>

                        {/* Title + Edit button in one line */}
                        <div className="flex items-center justify-between mb-3 min-w-0">
                            {/* حذف زر التعديل من هنا لأنه داخل البلوك الأزرق الآن */}
                        </div>

                        {/* نص التقييم بخلفية زرقاء + زر التعديل داخل نفس البلوك */}
                        <div className=" p-3 rounded-md mb-4 flex justify-between items-start max-w-full">
                            <p
                                className="text-gray-700 max-w-[calc(100%-40px)] h-[120px] max-h-[120px] overflow-y-auto whitespace-pre-wrap"
                                aria-label="Testimonial"
                            >
                                {trimmedText}
                            </p>

                            {/* زر التعديل داخل نفس البلوك */}
                            {!isReviewCard && user._id === userData?._id && (
                                <button
                                    onClick={() => handleFormOpen(current)}
                                    title="Edit Review"
                                    className="ml-4 text-primary hover:opacity-105 transition flex-shrink-0"
                                >
                                    <Pencil size={22} />
                                </button>
                            )}
                        </div>

                        {/* اسم المستخدم والموقع */}
                        <div className="font-bold text-lg text-gray-900 truncate max-w-full">
                            {user.name || "Anonymous"}
                        </div>
                        {location && (
                            <div className="text-sm text-gray-500 truncate max-w-full">
                                {location}
                            </div>
                        )}

                        {/* زر إضافة تقييم */}
                        {isReviewCard && !userHasTestimonial && token && (
                            <button
                                onClick={() => handleFormOpen()}
                                className="mt-6 bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 transition w-fit"
                            >
                                Add Your Review
                            </button>
                        )}
                    </div>
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="flex items-center justify-center w-12 h-12 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition select-none font-bold"
                >
                    ›
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
                    role="dialog"
                    aria-modal="true"
                >
                    <form
                        onSubmit={handleFormSubmit}
                        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
                    >
                        <h2 className="text-xl font-bold text-center">
                            {editId
                                ? "Edit Your Testimonial"
                                : "Submit Your Testimonial"}
                        </h2>

                        <textarea
                            placeholder="Write your testimonial..."
                            className="w-full border px-3 py-2 rounded min-h-[120px] resize-none"
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
                        <div className="flex justify-end space-x-2 ">
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

export default Testimonial;
