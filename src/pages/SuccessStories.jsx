import React from "react";
import { useNavigate } from "react-router-dom";

const successStories = [
  {
    name: "Rahul Kumar",
    country: "UK",
    course: "Masters in Computer Science",
    university: "University of Manchester",
    amount: "₹18 Lakhs Scholarship",
    image: "https://randomuser.me/api/portraits/men/69.jpg",
  },
  {
    name: "Priya Sharma",
    country: "USA",
    course: "MBA",
    university: "University of Texas",
    amount: "₹12 Lakhs Scholarship",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Suresh",
    country: "Karnataka",
    course: "Data Science",
    university: "University of Toronto",
    amount: "₹15 Lakhs Scholarship",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

const SuccessStories = () => {
  const navigate = useNavigate()
  return (
    // <section className="bg-gradient-to-b from-[#f5f7fb] to-white pt-36 pb-16 px-6">
    //   <div className="max-w-6xl mx-auto text-center">

    //     {/* Heading */}
    //     <h2 className="text-4xl font-bold text-[#0B1E6D] mb-4">
    //       Success Stories
    //     </h2>
    //     <p className="text-gray-600 max-w-2xl mx-auto mb-12">
    //       Real students. Real achievements. Discover how Edufin Scholarships
    //       helped students achieve their global education dreams.
    //     </p>

    //     {/* Cards */}
    //     <div className="grid md:grid-cols-3 gap-8">
    //       {successStories.map((student, index) => (
    //         <div
    //           key={index}
    //           className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden group"
    //         >

    //           {/* Top Gradient */}
    //           <div className="h-2 bg-gradient-to-r from-[#0B1E6D] to-[#2F6FD6]" />

    //           <div className="p-6">

    //             {/* Image */}
    //             <div className="flex justify-center mb-4">
    //               <img
    //                 src={student.image}
    //                 alt={student.name}
    //                 className="w-20 h-20 rounded-full border-4 border-[#D4AF37] object-cover"
    //               />
    //             </div>

    //             {/* Name */}
    //             <h3 className="text-xl font-semibold text-[#0B1E6D]">
    //               {student.name}
    //             </h3>

    //             {/* Country */}
    //             <p className="text-sm text-gray-500 mb-3">
    //               {student.country}
    //             </p>

    //             {/* Details */}
    //             <p className="text-gray-700 text-sm">
    //               {student.course}
    //             </p>
    //             <p className="text-gray-500 text-sm mb-3">
    //               {student.university}
    //             </p>

    //             {/* Scholarship */}
    //             <p className="text-[#D4AF37] font-semibold">
    //               {student.amount}
    //             </p>

    //             {/* Badge */}
    //             <div className="mt-4 inline-block bg-[#0B1E6D] text-white text-xs px-3 py-1 rounded-full">
    //               Verified Success
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>

    //     {/* CTA */}
    //     <div className="mt-12">
    //       <button onClick={()=>navigate("/login")} className="bg-[#0B1E6D] hover:bg-[#08164f] text-white px-8 py-3 rounded-lg shadow-md transition duration-300">
    //         Start Your Journey
    //       </button>
    //     </div>

    //   </div>
    // </section>
    <></>
  );
};

export default SuccessStories;