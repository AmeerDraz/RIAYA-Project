
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
    const [loading, setLoading] = useState(true);

    const { backendUrl, token, userData, fetchUserData } =
        useContext(AppContext);

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(
                `${backendUrl}/api/user/testimonial/list`
            ); // إزالة token من الاستدعاء
            if (data.success) {
                setTestimonialList(data.testimonials);
                if (fetchUserData && token) fetchUserData(); // فقط إذا كان هناك token
            } else {
                console.error("API response error:", data.message);
            }
        } catch (error) {
            toast.error("Failed to load testimonials.");
            console.error("Fetch testimonials error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials(); // تشغيل دائمًا بغض النظر عن token أو userData
    }, [backendUrl]);

    // تحقق إذا كان المستخدم لديه تقييم
    const userHasTestimonial =
        userData?.isReviewed ||
        (token && testimonialList.some((t) => t.user?._id === userData?._id));

    // واجهة إضافة التقييم تظهر فقط إذا كان المستخدم مسجلاً الدخول ولم يسبق له التقييم
    const showAnonymous = !!token && !userHasTestimonial;
    let total = testimonialList.length;
    let anonymousPosition = null;
    if (showAnonymous) {
        if (testimonialList.length === 0) {
            anonymousPosition = 0;
            total = 1;
        } else {
            anonymousPosition = 1;
            total = testimonialList.length + 1;
        }
    }

    const handlePrev = () => {
        setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
    };

    const handleNext = () => {
        setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
    };

    const handleFormOpen = (testimonial = null) => {
        if (!token) {
            toast.error("Please log in to add or edit a review.");
            return;
        }
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
        if (!token) {
            toast.error("Please log in to submit or edit a review.");
            setModalOpen(false);
            return;
        }
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
                { headers: { token } }
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

    // تحديد إذا كانت البطاقة الحالية هي بطاقة "أضف تقييمك"
    let isReviewCard = false;
    let testimonialIndex = index;
    if (showAnonymous) {
        if (anonymousPosition === 0) {
            isReviewCard = index === 0;
            testimonialIndex = 0;
        } else if (anonymousPosition === 1) {
            isReviewCard = index === 1;
            testimonialIndex = index > 1 ? index - 1 : 0;
        }
    }
    const current = !isReviewCard
        ? testimonialList[testimonialIndex] || {}
        : {
              user: {
                  name: "Anonymous",
                  image: assets.Anonymous,
                  address: { line1: "" },
              },
              title: "",
              text: "Write your own review and share your experience with us!",
          };

    const { user = {}, text = "" } = current;
    const location = user.address?.line1 || "";

    const trimmedText =
        text.split(" ").slice(0, 400).join(" ") +
        (text.split(" ").length > 400 ? "..." : "");

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <section className="bg-white py-8 md:py-10 min-h-[400px] max-h-[580px] w-full max-w-5xl mx-auto overflow-hidden px-4">
            <div className="relative flex items-center justify-center gap-4">
                <button
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="flex items-center justify-center w-12 h-12 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition select-none font-bold"
                    disabled={total <= 1}
                >
                    ‹
                </button>

                <div className="flex flex-col justify-center md:flex-row items-center gap-8 w-full max-w-3xl">
                    <div className="">
                        <img
                            src={user.image || assets.Anonymous}
                            alt={user.name || "Anonymous"}
                            className="w-28 h-28 rounded-full object-cover flex-shrink-0 object-top"
                        />
                    </div>

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

                        {/* زر إضافة تقييم: يظهر فقط إذا لم يسبق للمستخدم التقييم وكان مسجلاً الدخول */}
                        {isReviewCard && showAnonymous && (
                            <div className="flex w-full justify-center mt-1">
                                <button
                                    onClick={() => handleFormOpen()}
                                    className="bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 transition w-full max-w-xs md:w-fit"
                                >
                                    Add Your Review
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <button
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="flex items-center justify-center w-12 h-12 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition select-none font-bold"
                    disabled={total <= 1}
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
                        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end sm:space-x-2 ">
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 w-full sm:w-auto"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 w-full sm:w-auto"
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
