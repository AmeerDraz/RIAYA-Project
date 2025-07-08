// // import React, { useState } from "react";
// // import { assets, testimonials } from "../assets/assets"; // Your static data
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { useContext } from "react";
// // import { AppContext } from "../context/AppContext";

// // export default function Testimonial() {
// //     const [index, setIndex] = useState(0);
// //     const [isModalOpen, setModalOpen] = useState(false);
// //     const [formData, setFormData] = useState({
// //         name: "",
// //         location: "",
// //         text: "",
// //     });

// //     const { backendUrl } = useContext(AppContext);

// //     const total = testimonials.length + 1; // Add 1 for the review form card

// //     const handlePrev = () => {
// //         setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
// //     };

// //     const handleNext = () => {
// //         setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
// //     };

// //     const handleFormSubmit = async (e) => {
// //         e.preventDefault();

// //         try {
// //             const { data } = await axios.post(
// //                 backendUrl + "/api/user/testimonial/add",
// //                 {
// //                     ...formData,
// //                     image: "/anonymous-avatar.png",
// //                 }
// //             );

// //             if (data.success) {
// //                 toast.success("Your testimonial has been submitted!");
// //                 setFormData({ name: "", location: "", text: "" });
// //                 setModalOpen(false);
// //             } else {
// //                 toast.error(data.message || "Submission failed.");
// //             }
// //         } catch (error) {
// //             console.error(error);
// //             toast.error("Error submitting testimonial.");
// //         }
// //     };

// //     const isReviewCard = index === 1; // Show "Write a Review" card as second slide

// //     const { name, location, text, image } = !isReviewCard
// //         ? testimonials[index < 1 ? index : index - 1] // Adjust index to skip review card
// //         : {
// //               name: "Anonymous",
// //               location: "",
// //               text: "Write your own review and share your experience with us!",
// //               image: assets.upload_area,
// //           };

// //     return (
// //         <section className="bg-white py-8 md:py-8 min-h-[320px] max-h-[350px] overflow-scroll">
// //             <div className="max-w-5xl mx-auto relative flex items-center justify-center px-4">
// //                 {/* Left Arrow */}
// //                 <button
// //                     onClick={handlePrev}
// //                     className="absolute left-0 md:left-[-40px] lg:left-[-56px] top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 z-10 text-2xl ml-6"
// //                 >
// //                     ‹
// //                 </button>

// //                 {/* Content */}
// //                 <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:gap-10 w-full max-w-3xl mx-auto text-center md:text-left">
// //                     {/* Image */}
// //                     <img
// //                         src={image}
// //                         alt={name}
// //                         className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full object-cover shadow-lg flex-shrink-0"
// //                     />

// //                     {/* Text */}
// //                     <div className="flex-1">
// //                         <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
// //                             What Our Client Says
// //                         </h2>
// //                         <p className="text-teal-600 font-medium mb-4">
// //                             Testimonials
// //                         </p>
// //                         <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base lg:text-lg leading-relaxed min-h-20 max-h-20 overflow-scroll">
// //                             {text}
// //                         </p>
// //                         <div className="text-sm lg:text-base font-bold text-gray-800">
// //                             {name}
// //                         </div>
// //                         {location && (
// //                             <div className="text-xs lg:text-sm text-gray-500">
// //                                 {location}
// //                             </div>
// //                         )}
// //                         {isReviewCard && (
// //                             <button
// //                                 onClick={() => setModalOpen(true)}
// //                                 className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
// //                             >
// //                                 Add Your Review
// //                             </button>
// //                         )}
// //                     </div>
// //                 </div>

// //                 {/* Right Arrow */}
// //                 <button
// //                     onClick={handleNext}
// //                     className="absolute right-0 md:right-[-40px] lg:right-[-56px] top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 z-10 text-2xl mr-6"
// //                 >
// //                     ›
// //                 </button>
// //             </div>

// //             {/* Modal */}
// //             {isModalOpen && (
// //                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //                     <form
// //                         onSubmit={handleFormSubmit}
// //                         className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
// //                     >
// //                         <h2 className="text-xl font-bold text-center">
// //                             Submit Your Testimonial
// //                         </h2>
// //                         <input
// //                             type="text"
// //                             placeholder="Your Name"
// //                             className="w-full border px-3 py-2 rounded"
// //                             value={formData.name}
// //                             onChange={(e) =>
// //                                 setFormData({
// //                                     ...formData,
// //                                     name: e.target.value,
// //                                 })
// //                             }
// //                             required
// //                         />
// //                         <input
// //                             type="text"
// //                             placeholder="Your Location"
// //                             className="w-full border px-3 py-2 rounded"
// //                             value={formData.location}
// //                             onChange={(e) =>
// //                                 setFormData({
// //                                     ...formData,
// //                                     location: e.target.value,
// //                                 })
// //                             }
// //                             required
// //                         />
// //                         <textarea
// //                             placeholder="Write your testimonial..."
// //                             className="w-full border px-3 py-2 rounded min-h-[120px]"
// //                             rows="4"
// //                             value={formData.text}
// //                             onChange={(e) =>
// //                                 setFormData({
// //                                     ...formData,
// //                                     text: e.target.value,
// //                                 })
// //                             }
// //                             required
// //                         />
// //                         <div className="flex justify-end space-x-2">
// //                             <button
// //                                 type="button"
// //                                 onClick={() => setModalOpen(false)}
// //                                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
// //                             >
// //                                 Cancel
// //                             </button>
// //                             <button
// //                                 type="submit"
// //                                 className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
// //                             >
// //                                 Submit
// //                             </button>
// //                         </div>
// //                     </form>
// //                 </div>
// //             )}
// //         </section>
// //     );
// // }

// // ✅ Testimonial.jsx (الفرونت)

// // import React, { useState, useEffect, useContext } from "react";
// // import { assets } from "../assets/assets";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { AppContext } from "../context/AppContext";

// // function Testimonial() {
// //     const [index, setIndex] = useState(0);
// //     const [isModalOpen, setModalOpen] = useState(false);
// //     const [formData, setFormData] = useState({ name: "", location: "", text: "" });
// //     const [testimonialList, setTestimonialList] = useState([]);

// //     const { backendUrl, token } = useContext(AppContext);

// //     const fetchTestimonials = async () => {
// //         try {
// //             const { data } = await axios.get(backendUrl + "/api/user/testimonial/list");
// //             if (data.success) {
// //                 setTestimonialList(data.testimonials);
// //             }
// //         } catch (error) {
// //             toast.error("Failed to load testimonials.");
// //         }
// //     };

// //     useEffect(() => {
// //         fetchTestimonials();
// //     }, []);

// //     const total = testimonialList.length + 1;

// //     const handlePrev = () => {
// //         setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
// //     };

// //     const handleNext = () => {
// //         setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
// //     };

// //     const handleFormSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const { data } = await axios.post(
// //                 backendUrl + "/api/user/testimonial/add",
// //                 {
// //                     text: formData.text,
// //                 },
// //                 {
// //                     headers: { token }, // أضف التوكن للمصادقة
// //                 }
// //             );

// //             if (data.success) {
// //                 toast.success("Your testimonial has been submitted!");
// //                 setFormData({ text: "" });
// //                 setModalOpen(false);
// //                 fetchTestimonials(); // تحديث القائمة
// //             } else {
// //                 toast.error(data.message || "Submission failed.");
// //             }
// //         } catch (error) {
// //             toast.error(
// //                 error.response?.data?.message || "Error submitting testimonial."
// //             );
// //         }
// //     };

// //     const isReviewCard = index === 1;
// //     const { name, location, text, image } = !isReviewCard
// //         ? testimonialList[index < 1 ? index : index - 1] || {}
// //         : {
// //               name: "Anonymous",
// //               location: "",
// //               text: "Write your own review and share your experience with us!",
// //               image: assets.upload_area,
// //           };

// //     return (
// //         <section className="bg-white py-8 md:py-8 min-h-[320px] max-h-[350px] overflow-scroll">
// //             <div className="max-w-5xl mx-auto relative flex items-center justify-center px-4">
// //                 <button onClick={handlePrev} className="absolute left-0 text-2xl ml-6">‹</button>

// //                 <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-3xl mx-auto text-center md:text-left">
// //                     <img src={image} alt={name} className="w-32 h-32 rounded-full object-cover" />
// //                     <div className="flex-1">
// //                         <h2 className="text-2xl font-bold mb-2">What Our Client Says</h2>
// //                         <p className="text-teal-600 font-medium mb-4">Testimonials</p>
// //                         <p className="text-gray-600 mb-4">{text}</p>
// //                         <div className="font-bold">{name}</div>
// //                         {location && <div className="text-sm text-gray-500">{location}</div>}
// //                         {isReviewCard && (
// //                             <button
// //                                 onClick={() => setModalOpen(true)}
// //                                 className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
// //                             >
// //                                 Add Your Review
// //                             </button>
// //                         )}
// //                     </div>
// //                 </div>

// //                 <button onClick={handleNext} className="absolute right-0 text-2xl mr-6">›</button>
// //             </div>

// //             {isModalOpen && (
// //                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //                     <form
// //                         onSubmit={handleFormSubmit}
// //                         className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
// //                     >
// //                         <h2 className="text-xl font-bold text-center">Submit Your Testimonial</h2>
// //                         <input
// //                             type="text"
// //                             placeholder="Your Name"
// //                             className="w-full border px-3 py-2 rounded"
// //                             value={formData.name}
// //                             onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                             required
// //                         />
// //                         <input
// //                             type="text"
// //                             placeholder="Your Location"
// //                             className="w-full border px-3 py-2 rounded"
// //                             value={formData.location}
// //                             onChange={(e) => setFormData({ ...formData, location: e.target.value })}
// //                             required
// //                         />
// //                         <textarea
// //                             placeholder="Write your testimonial..."
// //                             className="w-full border px-3 py-2 rounded min-h-[120px]"
// //                             rows="4"
// //                             value={formData.text}
// //                             onChange={(e) => setFormData({ ...formData, text: e.target.value })}
// //                             required
// //                         />
// //                         <div className="flex justify-end space-x-2">
// //                             <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
// //                             <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">Submit</button>
// //                         </div>
// //                     </form>
// //                 </div>
// //             )}
// //         </section>
// //     );
// // }

// // export default Testimonial;

// // import React, { useState, useEffect, useContext } from "react";
// // import { assets } from "../assets/assets";
// // import axios from "axios";
// // import { toast } from "react-toastify";
// // import { AppContext } from "../context/AppContext";

// // function Testimonial() {
// //     const [index, setIndex] = useState(0);
// //     const [isModalOpen, setModalOpen] = useState(false);
// //     const [formData, setFormData] = useState({ text: "", location: "" });
// //     const [testimonialList, setTestimonialList] = useState([]);

// //     const { backendUrl, token, userData } = useContext(AppContext);

// //     const fetchTestimonials = async () => {
// //         try {
// //             const { data } = await axios.get(
// //                 `${backendUrl}/api/user/testimonial/list`
// //             );
// //             if (data.success) {
// //                 setTestimonialList(data.testimonials);
// //             }
// //         } catch (error) {
// //             toast.error("Failed to load testimonials.");
// //         }
// //     };

// //     useEffect(() => {
// //         fetchTestimonials();
// //     }, []);

// //     const total = testimonialList.length + 1;

// //     const handlePrev = () => {
// //         setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
// //     };

// //     const handleNext = () => {
// //         setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
// //     };

// //     const handleFormOpen = () => {
// //         setFormData({
// //             text: "",
// //             location: userData?.address?.line1 || "",
// //         });
// //         setModalOpen(true);
// //     };

// //     const handleFormSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const { data } = await axios.post(
// //                 `${backendUrl}/api/user/testimonial/add`,
// //                 {
// //                     text: formData.text,
// //                     location: formData.location,
// //                 },
// //                 {
// //                     headers: { token },
// //                 }
// //             );

// //             if (data.success) {
// //                 toast.success("Your testimonial has been submitted!");
// //                 setFormData({ text: "", location: "" });
// //                 setModalOpen(false);
// //                 fetchTestimonials();
// //             } else {
// //                 toast.error(data.message || "Submission failed.");
// //             }
// //         } catch (error) {
// //             toast.error(
// //                 error.response?.data?.message || "Error submitting testimonial."
// //             );
// //         }
// //     };

// //     const userHasTestimonial = testimonialList.some(
// //         (t) => t.user?._id === userData?._id
// //     );

// //     const isReviewCard = index === 1;
// //     const current = !isReviewCard
// //         ? testimonialList[index < 1 ? index : index - 1] || {}
// //         : {
// //               user: {
// //                   name: "Anonymous",
// //                   image: assets.upload_area,
// //                   address: { line1: "" },
// //               },
// //               text: "Write your own review and share your experience with us!",
// //           };

// //     const { user = {}, text = "" } = current;
// //     const location = user.address?.line1 || "";

// //     return (
// //         <section className="bg-white py-8 md:py-8 min-h-[320px] max-h-[350px] overflow-scroll">
// //             <div className="max-w-5xl mx-auto relative flex items-center justify-center px-4">
// //                 <button
// //                     onClick={handlePrev}
// //                     className="absolute left-0 text-2xl ml-6"
// //                 >
// //                     ‹
// //                 </button>

// //                 <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-3xl mx-auto text-center md:text-left">
// //                     <img
// //                         src={user.image || "/anonymous-avatar.png"}
// //                         alt={user.name}
// //                         className="w-32 h-32 rounded-full object-cover"
// //                     />
// //                     <div className="flex-1">
// //                         <h2 className="text-2xl font-bold mb-2">
// //                             What Our Client Says
// //                         </h2>
// //                         <p className="text-teal-600 font-medium mb-4">
// //                             Testimonials
// //                         </p>
// //                         <p className="text-gray-600 mb-4">{text}</p>
// //                         <div className="font-bold">
// //                             {user.name || "Anonymous"}
// //                         </div>
// //                         {location && (
// //                             <div className="text-sm text-gray-500">
// //                                 {location}
// //                             </div>
// //                         )}
// //                         {isReviewCard && !userHasTestimonial && token && (
// //                             <button
// //                                 onClick={handleFormOpen}
// //                                 className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
// //                             >
// //                                 Add Your Review
// //                             </button>
// //                         )}
// //                     </div>
// //                 </div>

// //                 <button
// //                     onClick={handleNext}
// //                     className="absolute right-0 text-2xl mr-6"
// //                 >
// //                     ›
// //                 </button>
// //             </div>

// //             {isModalOpen && (
// //                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //                     <form
// //                         onSubmit={handleFormSubmit}
// //                         className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
// //                     >
// //                         <h2 className="text-xl font-bold text-center">
// //                             Submit Your Testimonial
// //                         </h2>
// //                         <input
// //                             type="text"
// //                             placeholder="Your Location"
// //                             className="w-full border px-3 py-2 rounded"
// //                             value={formData.location}
// //                             onChange={(e) =>
// //                                 setFormData({
// //                                     ...formData,
// //                                     location: e.target.value,
// //                                 })
// //                             }
// //                             required
// //                         />
// //                         <textarea
// //                             placeholder="Write your testimonial..."
// //                             className="w-full border px-3 py-2 rounded min-h-[120px]"
// //                             rows="4"
// //                             value={formData.text}
// //                             onChange={(e) =>
// //                                 setFormData({
// //                                     ...formData,
// //                                     text: e.target.value,
// //                                 })
// //                             }
// //                             required
// //                         />
// //                         <div className="flex justify-end space-x-2">
// //                             <button
// //                                 type="button"
// //                                 onClick={() => setModalOpen(false)}
// //                                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
// //                             >
// //                                 Cancel
// //                             </button>
// //                             <button
// //                                 type="submit"
// //                                 className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
// //                             >
// //                                 Submit
// //                             </button>
// //                         </div>
// //                     </form>
// //                 </div>
// //             )}
// //         </section>
// //     );
// // }

// // export default Testimonial;

// import React, { useState, useEffect, useContext } from "react";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";

// function Testimonial() {
//     const [index, setIndex] = useState(0);
//     const [isModalOpen, setModalOpen] = useState(false);
//     const [formData, setFormData] = useState({
//         title: "",
//         text: "",
//         location: "",
//     });
//     const [testimonialList, setTestimonialList] = useState([]);

//     const { backendUrl, token, userData } = useContext(AppContext);

//     const fetchTestimonials = async () => {
//         try {
//             const { data } = await axios.get(
//                 `${backendUrl}/api/user/testimonial/list`
//             );
//             if (data.success) {
//                 setTestimonialList(data.testimonials);
//             }
//         } catch (error) {
//             toast.error("Failed to load testimonials.");
//         }
//     };

//     useEffect(() => {
//         fetchTestimonials();
//     }, []);

//     const total = testimonialList.length + 1;

//     const handlePrev = () => {
//         setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
//     };

//     const handleNext = () => {
//         setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
//     };

//     const handleFormOpen = () => {
//         setFormData({
//             title: "",
//             text: "",
//             location: userData?.address?.line1 || "",
//         });
//         setModalOpen(true);
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post(
//                 `${backendUrl}/api/user/testimonial/add`,
//                 {
//                     title: formData.title,
//                     text: formData.text,
//                     location: formData.location,
//                 },
//                 {
//                     headers: { token },
//                 }
//             );

//             if (data.success) {
//                 toast.success("Your testimonial has been submitted!");
//                 setFormData({ title: "", text: "", location: "" });
//                 setModalOpen(false);
//                 fetchTestimonials();
//             } else {
//                 toast.error(data.message || "Submission failed.");
//             }
//         } catch (error) {
//             toast.error(
//                 error.response?.data?.message || "Error submitting testimonial."
//             );
//         }
//     };

//     const handleDelete = async (id) => {
//         if (
//             !window.confirm("Are you sure you want to delete your testimonial?")
//         )
//             return;
//         try {
//             const { data } = await axios.delete(
//                 `${backendUrl}/api/user/testimonial/delete/${id}`,
//                 { headers: { token } }
//             );
//             if (data.success) {
//                 toast.success("Testimonial deleted successfully.");
//                 fetchTestimonials();
//             } else {
//                 toast.error(data.message || "Delete failed.");
//             }
//         } catch (error) {
//             toast.error(
//                 error.response?.data?.message || "Error deleting testimonial."
//             );
//         }
//     };

//     const userHasTestimonial = testimonialList.some(
//         (t) => t.user?._id === userData?._id
//     );

//     const isReviewCard = index === 1;
//     const current = !isReviewCard
//         ? testimonialList[index < 1 ? index : index - 1] || {}
//         : {
//               user: {
//                   name: "Anonymous",
//                   image: assets.upload_area,
//                   address: { line1: "" },
//               },
//               title: "",
//               text: "Write your own review and share your experience with us!",
//           };

//     const { user = {}, title = "", text = "" } = current;
//     const location = user.address?.line1 || "";

//     return (
//         <section className="bg-white py-8 md:py-8 min-h-[320px] max-h-[350px] overflow-scroll">
//             <div className="max-w-5xl mx-auto relative flex items-center justify-center px-4">
//                 <button
//                     onClick={handlePrev}
//                     className="absolute left-0 text-2xl ml-6"
//                 >
//                     ‹
//                 </button>

//                 <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-3xl mx-auto text-center md:text-left">
//                     <img
//                         src={user.image || "/anonymous-avatar.png"}
//                         alt={user.name}
//                         className="w-32 h-32 rounded-full object-cover"
//                     />
//                     <div className="flex-1">
//                         <h2 className="text-2xl font-bold mb-2">
//                             What Our Client Says
//                         </h2>
//                         <p className="text-teal-600 font-medium mb-2">
//                             Testimonials
//                         </p>
//                         {title && (
//                             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                                 {title}
//                             </h3>
//                         )}
//                         <p className="text-gray-600 mb-4">{text}</p>
//                         <div className="font-bold">
//                             {user.name || "Anonymous"}
//                         </div>
//                         {location && (
//                             <div className="text-sm text-gray-500">
//                                 {location}
//                             </div>
//                         )}
//                         {isReviewCard && !userHasTestimonial && token && (
//                             <button
//                                 onClick={handleFormOpen}
//                                 className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
//                             >
//                                 Add Your Review
//                             </button>
//                         )}
//                         {!isReviewCard && user._id === userData?._id && (
//                             <button
//                                 onClick={() => handleDelete(current._id)}
//                                 className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                             >
//                                 Delete Review
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 <button
//                     onClick={handleNext}
//                     className="absolute right-0 text-2xl mr-6"
//                 >
//                     ›
//                 </button>
//             </div>

//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <form
//                         onSubmit={handleFormSubmit}
//                         className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
//                     >
//                         <h2 className="text-xl font-bold text-center">
//                             Submit Your Testimonial
//                         </h2>

//                         <input
//                             type="text"
//                             placeholder="Your Location"
//                             className="w-full border px-3 py-2 rounded"
//                             value={formData.location}
//                             onChange={(e) =>
//                                 setFormData({
//                                     ...formData,
//                                     location: e.target.value,
//                                 })
//                             }
//                             required
//                         />
//                         <textarea
//                             placeholder="Write your testimonial..."
//                             className="w-full border px-3 py-2 rounded min-h-[120px]"
//                             rows="4"
//                             value={formData.text}
//                             onChange={(e) =>
//                                 setFormData({
//                                     ...formData,
//                                     text: e.target.value,
//                                 })
//                             }
//                             required
//                         />
//                         <div className="flex justify-end space-x-2">
//                             <button
//                                 type="button"
//                                 onClick={() => setModalOpen(false)}
//                                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
//                             >
//                                 Submit
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}
//         </section>
//     );
// }

// export default Testimonial;

// import React, { useState, useEffect, useContext } from "react";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";

// function Testimonial() {
//     const [index, setIndex] = useState(0);
//     const [isModalOpen, setModalOpen] = useState(false);
//     const [editId, setEditId] = useState(null);
//     const [formData, setFormData] = useState({
//         title: "",
//         text: "",
//         location: "",
//     });
//     const [testimonialList, setTestimonialList] = useState([]);

//     const { backendUrl, token, userData } = useContext(AppContext);

//     const fetchTestimonials = async () => {
//         try {
//             const { data } = await axios.get(
//                 `${backendUrl}/api/user/testimonial/list`
//             );
//             if (data.success) {
//                 setTestimonialList(data.testimonials);
//             }
//         } catch (error) {
//             toast.error("Failed to load testimonials.");
//         }
//     };

//     useEffect(() => {
//         fetchTestimonials();
//     }, []);

//     const total = testimonialList.length + 1;

//     const handlePrev = () => {
//         setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
//     };

//     const handleNext = () => {
//         setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
//     };

//     const handleFormOpen = (testimonial = null) => {
//         if (testimonial) {
//             setEditId(testimonial._id);
//             setFormData({
//                 title: testimonial.title || "",
//                 text: testimonial.text || "",
//                 location: testimonial.location || "",
//             });
//         } else {
//             setEditId(null);
//             setFormData({
//                 title: "",
//                 text: "",
//                 location: userData?.address?.line1 || "",
//             });
//         }
//         setModalOpen(true);
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const url = editId
//                 ? `${backendUrl}/api/user/testimonial/update/${editId}`
//                 : `${backendUrl}/api/user/testimonial/add`;

//             const method = editId ? "put" : "post";

//             const { data } = await axios[method](
//                 url,
//                 {
//                     title: formData.title,
//                     text: formData.text,
//                     location: formData.location,
//                 },
//                 {
//                     headers: { token },
//                 }
//             );

//             if (data.success) {
//                 toast.success(editId ? "Review updated!" : "Review submitted!");
//                 setFormData({ title: "", text: "", location: "" });
//                 setEditId(null);
//                 setModalOpen(false);
//                 fetchTestimonials();
//             } else {
//                 toast.error(data.message || "Submission failed.");
//             }
//         } catch (error) {
//             toast.error(
//                 error.response?.data?.message || "Error submitting testimonial."
//             );
//         }
//     };

//     const userHasTestimonial = testimonialList.some(
//         (t) => t.user?._id === userData?._id
//     );

//     const isReviewCard = index === 1;
//     const current = !isReviewCard
//         ? testimonialList[index < 1 ? index : index - 1] || {}
//         : {
//               user: {
//                   name: "Anonymous",
//                   image: assets.upload_area,
//                   address: { line1: "" },
//               },
//               title: "",
//               text: "Write your own review and share your experience with us!",
//           };

//     const { user = {}, title = "", text = "" } = current;
//     const location = user.address?.line1 || "";

//     return (
//         <section className="bg-white py-8 md:py-8 min-h-[320px] max-h-[350px] overflow-scroll">
//             <div className="max-w-5xl mx-auto relative flex items-center justify-center px-4">
//                 <button
//                     onClick={handlePrev}
//                     className="absolute left-0 text-2xl ml-6"
//                 >
//                     ‹
//                 </button>

//                 <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-3xl mx-auto text-center md:text-left">
//                     <img
//                         src={user.image || "/anonymous-avatar.png"}
//                         alt={user.name}
//                         className="w-32 h-32 rounded-full object-cover"
//                     />
//                     <div className="flex-1">
//                         <h2 className="text-2xl font-bold mb-2">
//                             What Our Client Says
//                         </h2>
//                         <p className="text-teal-600 font-medium mb-2">
//                             Testimonials
//                         </p>
//                         {title && (
//                             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                                 {title}
//                             </h3>
//                         )}
//                         <p className="text-gray-600 mb-4">{text}</p>
//                         <div className="font-bold">
//                             {user.name || "Anonymous"}
//                         </div>
//                         {location && (
//                             <div className="text-sm text-gray-500">
//                                 {location}
//                             </div>
//                         )}
//                         {isReviewCard && !userHasTestimonial && token && (
//                             <button
//                                 onClick={() => handleFormOpen()}
//                                 className="mt-4 bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
//                             >
//                                 Add Your Review
//                             </button>
//                         )}
//                         {!isReviewCard && user._id === userData?._id && (
//                             <button
//                                 onClick={() => handleFormOpen(current)}
//                                 className="mt-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
//                             >
//                                 Edit Review
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 <button
//                     onClick={handleNext}
//                     className="absolute right-0 text-2xl mr-6"
//                 >
//                     ›
//                 </button>
//             </div>

//             {isModalOpen && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                     <form
//                         onSubmit={handleFormSubmit}
//                         className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
//                     >
//                         <h2 className="text-xl font-bold text-center">
//                             {editId
//                                 ? "Edit Your Testimonial"
//                                 : "Submit Your Testimonial"}
//                         </h2>

//                         {/* <input
//                             type="text"
//                             placeholder="Your Location"
//                             className="w-full border px-3 py-2 rounded"
//                             value={formData.location}
//                             onChange={(e) =>
//                                 setFormData({
//                                     ...formData,
//                                     location: e.target.value,
//                                 })
//                             }
//                             required
//                         /> */}
//                         <textarea
//                             placeholder="Write your testimonial..."
//                             className="w-full border px-3 py-2 rounded min-h-[120px]"
//                             rows="4"
//                             value={formData.text}
//                             onChange={(e) =>
//                                 setFormData({
//                                     ...formData,
//                                     text: e.target.value,
//                                 })
//                             }
//                             required
//                         />
//                         <div className="flex justify-end space-x-2">
//                             <button
//                                 type="button"
//                                 onClick={() => setModalOpen(false)}
//                                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
//                             >
//                                 Submit
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}
//         </section>
//     );
// }

// export default Testimonial;

// import React, { useState, useEffect, useContext } from "react";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";
// import { Pencil } from "lucide-react";

// function Testimonial() {
//     const [index, setIndex] = useState(0);
//     const [isModalOpen, setModalOpen] = useState(false);
//     const [editId, setEditId] = useState(null);
//     const [formData, setFormData] = useState({
//         text: "",
//         location: "",
//     });
//     const [testimonialList, setTestimonialList] = useState([]);

//     const { backendUrl, token, userData } = useContext(AppContext);

//     const fetchTestimonials = async () => {
//         try {
//             const { data } = await axios.get(
//                 `${backendUrl}/api/user/testimonial/list`
//             );
//             if (data.success) {
//                 setTestimonialList(data.testimonials);
//             }
//         } catch (error) {
//             toast.error("Failed to load testimonials.");
//         }
//     };

//     useEffect(() => {
//         fetchTestimonials();
//     }, []);

//     const total = testimonialList.length + 1;

//     const handlePrev = () => {
//         setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
//     };

//     const handleNext = () => {
//         setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
//     };

//     const handleFormOpen = (testimonial = null) => {
//         if (testimonial) {
//             setEditId(testimonial._id);
//             setFormData({
//                 text: testimonial.text || "",
//                 location: testimonial.location || "",
//             });
//         } else {
//             setEditId(null);
//             setFormData({
//                 text: "",
//                 location: userData?.address?.line1 || "",
//             });
//         }
//         setModalOpen(true);
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const url = editId
//                 ? `${backendUrl}/api/user/testimonial/update/${editId}`
//                 : `${backendUrl}/api/user/testimonial/add`;

//             const method = editId ? "put" : "post";

//             const { data } = await axios[method](
//                 url,
//                 {
//                     text: formData.text,
//                     location: formData.location,
//                 },
//                 {
//                     headers: { token },
//                 }
//             );

//             if (data.success) {
//                 toast.success(editId ? "Review updated!" : "Review submitted!");
//                 setFormData({ text: "", location: "" });
//                 setEditId(null);
//                 setModalOpen(false);
//                 fetchTestimonials();
//             } else {
//                 toast.error(data.message || "Submission failed.");
//             }
//         } catch (error) {
//             toast.error(
//                 error.response?.data?.message || "Error submitting testimonial."
//             );
//         }
//     };

//     const userHasTestimonial = testimonialList.some(
//         (t) => t.user?._id === userData?._id
//     );

//     const isReviewCard = index === 1;
//     const current = !isReviewCard
//         ? testimonialList[index < 1 ? index : index - 1] || {}
//         : {
//               user: {
//                   name: "Anonymous",
//                   image: assets.upload_area,
//                   address: { line1: "" },
//               },
//               text: "Write your own review and share your experience with us!",
//           };

//     const { user = {}, text = "" } = current;
//     const location = user.address?.line1 || "";

//     const trimmedText =
//         text.split(" ").slice(0, 400).join(" ") +
//         (text.split(" ").length > 400 ? "..." : "");

//     return (
//         <section className="bg-white py-8 md:py-10 min-h-[400px] max-h-[480px] w-full max-w-5xl mx-auto overflow-hidden px-4">
//             <div className="relative flex items-center justify-center gap-4">
//                 {/* Prev Button */}
//                 <button
//                     onClick={handlePrev}
//                     aria-label="Previous testimonial"
//                     className="flex items-center justify-center w-12 h-12 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition select-none font-bold"
//                 >
//                     ‹
//                 </button>

//                 {/* Content between buttons */}
//                 <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-3xl">
//                     {/* User Image */}
//                     <img
//                         src={user.image || "/anonymous-avatar.png"}
//                         alt={user.name || "Anonymous"}
//                         className="w-28 h-28 rounded-full object-cover flex-shrink-0"
//                     />

//                     {/* Text Content */}
//                     <div className="flex flex-col flex-1 min-w-0">
//                         <p
//                             className="text-gray-700 mb-4 rounded-md p-3 max-w-full min-h-[120px] max-h-[120px] overflow-y-auto whitespace-pre-wrap border border-transparent"
//                             aria-label="Testimonial text"
//                         >
//                             {trimmedText}
//                         </p>

//                         {/* اسم المستخدم والموقع */}
//                         <div className="flex items-center justify-between">
//                             <div className="font-bold text-lg text-gray-900 truncate max-w-full">
//                                 {user.name || "Anonymous"}
//                             </div>
//                             {/* زر التعديل بجانب اسم المستخدم */}
//                             {!isReviewCard && user._id === userData?._id && (
//                                 <button
//                                     onClick={() => handleFormOpen(current)}
//                                     title="Edit Review"
//                                     className="ml-4 text-teal-700 hover:text-teal-900 transition flex-shrink-0"
//                                 >
//                                     <Pencil size={22} />
//                                 </button>
//                             )}
//                         </div>

//                         {location && (
//                             <div className="text-sm text-gray-500 truncate max-w-full mt-1">
//                                 {location}
//                             </div>
//                         )}

//                         {/* زر إضافة تقييم */}
//                         {isReviewCard && !userHasTestimonial && token && (
//                             <button
//                                 onClick={() => handleFormOpen()}
//                                 className="mt-6 bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 transition w-fit"
//                             >
//                                 Add Your Review
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Next Button */}
//                 <button
//                     onClick={handleNext}
//                     aria-label="Next testimonial"
//                     className="flex items-center justify-center w-12 h-12 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition select-none font-bold"
//                 >
//                     ›
//                 </button>
//             </div>

//             {/* Modal */}
//             {isModalOpen && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
//                     role="dialog"
//                     aria-modal="true"
//                 >
//                     <form
//                         onSubmit={handleFormSubmit}
//                         className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
//                     >
//                         <h2 className="text-xl font-bold text-center">
//                             {editId
//                                 ? "Edit Your Testimonial"
//                                 : "Submit Your Testimonial"}
//                         </h2>

//                         <textarea
//                             placeholder="Write your testimonial..."
//                             className="w-full border px-3 py-2 rounded min-h-[120px] resize-none"
//                             rows="4"
//                             value={formData.text}
//                             onChange={(e) =>
//                                 setFormData({
//                                     ...formData,
//                                     text: e.target.value,
//                                 })
//                             }
//                             required
//                         />
//                         <div className="flex justify-end space-x-2">
//                             <button
//                                 type="button"
//                                 onClick={() => setModalOpen(false)}
//                                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
//                             >
//                                 Submit
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}
//         </section>
//     );
// }

// export default Testimonial;


// import React, { useState, useEffect, useContext } from "react";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";
// import { Pencil } from "lucide-react";

// function Testimonial() {
//     const [index, setIndex] = useState(0);
//     const [isModalOpen, setModalOpen] = useState(false);
//     const [editId, setEditId] = useState(null);
//     const [formData, setFormData] = useState({
//         title: "",
//         text: "",
//         location: "",
//     });
//     const [testimonialList, setTestimonialList] = useState([]);

//     const { backendUrl, token, userData } = useContext(AppContext);

//     const fetchTestimonials = async () => {
//         try {
//             const { data } = await axios.get(
//                 `${backendUrl}/api/user/testimonial/list`
//             );
//             if (data.success) {
//                 setTestimonialList(data.testimonials);
//             }
//         } catch (error) {
//             toast.error("Failed to load testimonials.");
//         }
//     };

//     useEffect(() => {
//         fetchTestimonials();
//     }, []);

//     const total = testimonialList.length + 1;

//     const handlePrev = () => {
//         setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
//     };

//     const handleNext = () => {
//         setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
//     };

//     const handleFormOpen = (testimonial = null) => {
//         if (testimonial) {
//             setEditId(testimonial._id);
//             setFormData({
//                 title: testimonial.title || "",
//                 text: testimonial.text || "",
//                 location: testimonial.location || "",
//             });
//         } else {
//             setEditId(null);
//             setFormData({
//                 title: "",
//                 text: "",
//                 location: userData?.address?.line1 || "",
//             });
//         }
//         setModalOpen(true);
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const url = editId
//                 ? `${backendUrl}/api/user/testimonial/update/${editId}`
//                 : `${backendUrl}/api/user/testimonial/add`;

//             const method = editId ? "put" : "post";

//             const { data } = await axios[method](
//                 url,
//                 {
//                     title: formData.title,
//                     text: formData.text,
//                     location: formData.location,
//                 },
//                 {
//                     headers: { token },
//                 }
//             );

//             if (data.success) {
//                 toast.success(editId ? "Review updated!" : "Review submitted!");
//                 setFormData({ title: "", text: "", location: "" });
//                 setEditId(null);
//                 setModalOpen(false);
//                 fetchTestimonials();
//             } else {
//                 toast.error(data.message || "Submission failed.");
//             }
//         } catch (error) {
//             toast.error(
//                 error.response?.data?.message || "Error submitting testimonial."
//             );
//         }
//     };

//     const userHasTestimonial = testimonialList.some(
//         (t) => t.user?._id === userData?._id
//     );

//     const isReviewCard = index === 1;
//     const current = !isReviewCard
//         ? testimonialList[index < 1 ? index : index - 1] || {}
//         : {
//               user: {
//                   name: "Anonymous",
//                   image: assets.upload_area,
//                   address: { line1: "" },
//               },
//               title: "",
//               text: "Write your own review and share your experience with us!",
//           };

//     const { user = {}, title = "", text = "" } = current;
//     const location = user.address?.line1 || "";

//     // قص 400 كلمة كحد أقصى
//     const trimmedText =
//         text.split(" ").slice(0, 400).join(" ") +
//         (text.split(" ").length > 400 ? "..." : "");

//     return (
//         <section className="bg-white py-8 md:py-10 min-h-[400px] max-h-[480px] w-full max-w-5xl mx-auto overflow-hidden px-4">
//             <div className="relative flex items-center justify-center gap-4">
//                 {/* Prev Button */}
//                 <button
//                     onClick={handlePrev}
//                     aria-label="Previous testimonial"
//                     className="flex items-center justify-center w-12 h-12 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition select-none font-bold"
//                 >
//                     ‹
//                 </button>

//                 {/* Content between buttons */}
//                 <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-3xl">
//                     {/* User Image */}
//                     <img
//                         src={user.image || "/anonymous-avatar.png"}
//                         alt={user.name || "Anonymous"}
//                         className="w-28 h-28 rounded-full object-cover flex-shrink-0"
//                     />

//                     {/* Text Content */}
//                     <div className="flex flex-col flex-1 min-w-0 ">
//                         <h2 className="text-3xl font-extrabold mb-1 text-gray-900">
//                             What Our Client Says
//                         </h2>
//                         <p className="text-teal-600 font-semibold mb-3 uppercase tracking-wide">
//                             Testimonials
//                         </p>

//                         {/* Title + Edit button in one line */}
//                         <div className="flex items-center justify-between mb-3 min-w-0">
//                             <h3
//                                 className="text-xl font-semibold text-gray-800 truncate"
//                                 title={title}
//                             >
//                                 {title || "No Title"}
//                             </h3>

//                             {/* زر التعديل بجانب العنوان */}
//                             {!isReviewCard && user._id === userData?._id && (
//                                 <button
//                                     onClick={() => handleFormOpen(current)}
//                                     title="Edit Review"
//                                     className="ml-4 text-teal-600 hover:text-teal-800 transition flex-shrink-0"
//                                 >
//                                     <Pencil size={22} />
//                                 </button>
//                             )}
//                         </div>

//                         {/* نص التقييم بارتفاع أصغر وبوردر مخفي */}
//                         <p
//                             className="text-gray-700 mb-4 rounded-md p-3 max-w-full min-h-[120px] max-h-[120px] overflow-y-auto whitespace-pre-wrap border border-transparent"
//                             aria-label="Testimonial"
//                         >
//                             {trimmedText}
//                         </p>

//                         {/* اسم المستخدم والموقع */}
//                         <div className="font-bold text-lg text-gray-900 truncate max-w-full">
//                             {user.name || "Anonymous"}
//                         </div>
//                         {location && (
//                             <div className="text-sm text-gray-500 truncate max-w-full">
//                                 {location}
//                             </div>
//                         )}

//                         {/* زر إضافة تقييم */}
//                         {isReviewCard && !userHasTestimonial && token && (
//                             <button
//                                 onClick={() => handleFormOpen()}
//                                 className="mt-6 bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 transition w-fit"
//                             >
//                                 Add Your Review
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Next Button */}
//                 <button
//                     onClick={handleNext}
//                     aria-label="Next testimonial"
//                     className="flex items-center justify-center w-12 h-12 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition select-none font-bold"
//                 >
//                     ›
//                 </button>
//             </div>

//             {/* Modal */}
//             {isModalOpen && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
//                     role="dialog"
//                     aria-modal="true"
//                 >
//                     <form
//                         onSubmit={handleFormSubmit}
//                         className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
//                     >
//                         <h2 className="text-xl font-bold text-center">
//                             {editId
//                                 ? "Edit Your Testimonial"
//                                 : "Submit Your Testimonial"}
//                         </h2>

//                         <textarea
//                             placeholder="Write your testimonial..."
//                             className="w-full border px-3 py-2 rounded min-h-[120px] resize-none"
//                             rows="4"
//                             value={formData.text}
//                             onChange={(e) =>
//                                 setFormData({
//                                     ...formData,
//                                     text: e.target.value,
//                                 })
//                             }
//                             required
//                         />
//                         <div className="flex justify-end space-x-2 ">
//                             <button
//                                 type="button"
//                                 onClick={() => setModalOpen(false)}
//                                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
//                             >
//                                 Submit
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}
//         </section>
//     );
// }

// export default Testimonial;


// import React, { useState, useEffect, useContext } from "react";
// import { assets } from "../assets/assets";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";
// import { Pencil } from "lucide-react";

// function Testimonial() {
//     const [index, setIndex] = useState(0);
//     const [isModalOpen, setModalOpen] = useState(false);
//     const [editId, setEditId] = useState(null);
//     const [formData, setFormData] = useState({
//         title: "",
//         text: "",
//         location: "",
//     });
//     const [testimonialList, setTestimonialList] = useState([]);

//     const { backendUrl, token, userData } = useContext(AppContext);

//     const fetchTestimonials = async () => {
//         try {
//             const { data } = await axios.get(
//                 `${backendUrl}/api/user/testimonial/list`
//             );
//             if (data.success) {
//                 setTestimonialList(data.testimonials);
//             }
//         } catch (error) {
//             toast.error("Failed to load testimonials.");
//         }
//     };

//     useEffect(() => {
//         fetchTestimonials();
//     }, []);

//     const total = testimonialList.length + 1;

//     const handlePrev = () => {
//         setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
//     };

//     const handleNext = () => {
//         setIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
//     };

//     const handleFormOpen = (testimonial = null) => {
//         if (testimonial) {
//             setEditId(testimonial._id);
//             setFormData({
//                 title: testimonial.title || "",
//                 text: testimonial.text || "",
//                 location: testimonial.location || "",
//             });
//         } else {
//             setEditId(null);
//             setFormData({
//                 title: "",
//                 text: "",
//                 location: userData?.address?.line1 || "",
//             });
//         }
//         setModalOpen(true);
//     };

//     const handleFormSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const url = editId
//                 ? `${backendUrl}/api/user/testimonial/update/${editId}`
//                 : `${backendUrl}/api/user/testimonial/add`;

//             const method = editId ? "put" : "post";

//             const { data } = await axios[method](
//                 url,
//                 {
//                     title: formData.title,
//                     text: formData.text,
//                     location: formData.location,
//                 },
//                 {
//                     headers: { token },
//                 }
//             );

//             if (data.success) {
//                 toast.success(editId ? "Review updated!" : "Review submitted!");
//                 setFormData({ title: "", text: "", location: "" });
//                 setEditId(null);
//                 setModalOpen(false);
//                 fetchTestimonials();
//             } else {
//                 toast.error(data.message || "Submission failed.");
//             }
//         } catch (error) {
//             toast.error(
//                 error.response?.data?.message || "Error submitting testimonial."
//             );
//         }
//     };

//     const userHasTestimonial = testimonialList.some(
//         (t) => t.user?._id === userData?._id
//     );

//     const isReviewCard = index === 1;
//     const current = !isReviewCard
//         ? testimonialList[index < 1 ? index : index - 1] || {}
//         : {
//               user: {
//                   name: "Anonymous",
//                   image: assets.upload_area,
//                   address: { line1: "" },
//               },
//               title: "",
//               text: "Write your own review and share your experience with us!",
//           };

//     const { user = {}, title = "", text = "" } = current;
//     const location = user.address?.line1 || "";

//     // قص 400 كلمة كحد أقصى
//     const trimmedText =
//         text.split(" ").slice(0, 400).join(" ") +
//         (text.split(" ").length > 400 ? "..." : "");

//     return (
//         <section className="bg-white py-8 md:py-10 min-h-[400px] max-h-[480px] w-full max-w-5xl mx-auto overflow-hidden px-4">
//             <div className="relative flex items-center justify-center gap-4">
//                 {/* Prev Button */}
//                 <button
//                     onClick={handlePrev}
//                     aria-label="Previous testimonial"
//                     className="flex items-center justify-center w-12 h-12 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition select-none font-bold"
//                 >
//                     ‹
//                 </button>

//                 {/* Content between buttons */}
//                 <div className="flex flex-col justify-center md:flex-row items-center gap-8 w-full max-w-3xl bg-red-400">
//                     {/* User Image */}
//                     <div className="bg-green-600 ">
//                         <img
//                             src={user.image || "/anonymous-avatar.png"}
//                             alt={user.name || "Anonymous"}
//                             className="w-28 h-28 rounded-full object-cover flex-shrink-0 "
//                         />
//                     </div>

//                     {/* Text Content */}
//                     <div className="flex flex-col flex-1 min-w-0 ">
//                         <h2 className="text-3xl font-extrabold mb-1 text-gray-900">
//                             What Our Client Says
//                         </h2>
//                         <p className="text-teal-600 font-semibold mb-3 uppercase tracking-wide">
//                             Testimonials
//                         </p>

//                         {/* Title + Edit button in one line */}
//                         <div className="flex items-center justify-between mb-3 min-w-0">
//                             {/* زر التعديل بجانب العنوان */}
//                             {!isReviewCard && user._id === userData?._id && (
//                                 <button
//                                     onClick={() => handleFormOpen(current)}
//                                     title="Edit Review"
//                                     className="ml-4 text-primary hover:text-primary-dark transition flex-shrink-0"
//                                 >
//                                     <Pencil size={22} />
//                                 </button>
//                             )}
//                         </div>

//                         {/* نص التقييم بخلفية زرقاء */}
//                         <div className="bg-blue-500">
//                             <p
//                                 className="bg-blue-500 text-gray-700 mb-4 rounded-md p-3 max-w-full h-[120px] max-h-[120px] overflow-y-auto whitespace-pre-wrap border border-transparent"
//                                 aria-label="Testimonial"
//                             >
//                                 {trimmedText}
//                             </p>
//                         </div>

//                         {/* اسم المستخدم والموقع */}
//                         <div className="font-bold text-lg text-gray-900 truncate max-w-full">
//                             {user.name || "Anonymous"}
//                         </div>
//                         {location && (
//                             <div className="text-sm text-gray-500 truncate max-w-full">
//                                 {location}
//                             </div>
//                         )}

//                         {/* زر إضافة تقييم */}
//                         {isReviewCard && !userHasTestimonial && token && (
//                             <button
//                                 onClick={() => handleFormOpen()}
//                                 className="mt-6 bg-teal-600 text-white px-5 py-2 rounded-md hover:bg-teal-700 transition w-fit"
//                             >
//                                 Add Your Review
//                             </button>
//                         )}
//                     </div>
//                 </div>

//                 {/* Next Button */}
//                 <button
//                     onClick={handleNext}
//                     aria-label="Next testimonial"
//                     className="flex items-center justify-center w-12 h-12 border border-primary rounded-full text-primary hover:bg-primary hover:text-white transition select-none font-bold"
//                 >
//                     ›
//                 </button>
//             </div>

//             {/* Modal */}
//             {isModalOpen && (
//                 <div
//                     className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
//                     role="dialog"
//                     aria-modal="true"
//                 >
//                     <form
//                         onSubmit={handleFormSubmit}
//                         className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
//                     >
//                         <h2 className="text-xl font-bold text-center">
//                             {editId
//                                 ? "Edit Your Testimonial"
//                                 : "Submit Your Testimonial"}
//                         </h2>

//                         <textarea
//                             placeholder="Write your testimonial..."
//                             className="w-full border px-3 py-2 rounded min-h-[120px] resize-none"
//                             rows="4"
//                             value={formData.text}
//                             onChange={(e) =>
//                                 setFormData({
//                                     ...formData,
//                                     text: e.target.value,
//                                 })
//                             }
//                             required
//                         />
//                         <div className="flex justify-end space-x-2 ">
//                             <button
//                                 type="button"
//                                 onClick={() => setModalOpen(false)}
//                                 className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 type="submit"
//                                 className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
//                             >
//                                 Submit
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}
//         </section>
//     );
// }

// export default Testimonial;


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
