import { motion, AnimatePresence } from "motion/react";
import {
  FiX,
  FiCalendar,
  FiAward,
  FiFileText,
  FiCheckCircle,
  FiMapPin,
  FiChevronRight,
  FiInfo,
} from "react-icons/fi";
import {
  MdOutlineSchool,
  MdOutlineEmojiEvents,
  MdOutlineDescription,
  MdOutlineBookmarkBorder,
} from "react-icons/md";
import { FaUniversity, FaGraduationCap } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";

const ScholarshipDetailsModal = ({ isOpen, onClose, scholarship }) => {
  if (!scholarship) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP with blur */}
          <motion.div
            className="fixed inset-0 bg-[#0a1929]/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* RIGHT DRAWER - Clean Structured Design */}
          <motion.div
            className="fixed top-0 right-0 w-[600px] max-w-full h-full bg-white z-50 shadow-2xl overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Decorative top bar */}
            <div className="h-1 bg-gradient-to-r from-blue-500 to-amber-500" />

            {/* HEADER */}
            <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
              <div className="flex items-start justify-between p-6">
                <div className="flex-1 pr-8">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                    {scholarship.name}
                  </h1>
                  {scholarship.catchyPhrase && (
                    <p className="text-gray-600 text-sm">
                      {scholarship.catchyPhrase}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors flex-shrink-0"
                >
                  <FiX className="text-gray-500 text-xl" />
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6 space-y-6 pb-10">
              {/* Quick Info Pills */}
              <div className="flex flex-wrap gap-2">
                {scholarship.coverageArea && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                    <FiMapPin className="text-blue-500" size={12} />
                    {scholarship.coverageArea}
                  </span>
                )}
                {scholarship.type && scholarship.type.length > 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                    <MdOutlineSchool className="text-amber-500" size={12} />
                    {scholarship.type.map((t) => t.title).join(", ")}
                  </span>
                )}
                {scholarship.fieldOfStudy && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs font-medium">
                    <GiGraduateCap className="text-purple-500" size={12} />
                    {scholarship.fieldOfStudy.name}
                  </span>
                )}
              </div>

              {/* Eligibility Section */}
              {scholarship.eligibilityCriteria &&
                scholarship.eligibilityCriteria.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Eligibility
                    </h2>
                    <ul className="space-y-2">
                      {scholarship.eligibilityCriteria.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <span className="text-amber-500 font-bold mt-1">
                            •
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Notes Section */}
              {scholarship.notes && (
                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <div className="flex items-start gap-3">
                    <FiInfo className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2 text-sm text-amber-800">
                      {Array.isArray(scholarship.notes) ? (
                        scholarship.notes.map((note, i) => (
                          <p key={i}>{note}</p>
                        ))
                      ) : (
                        <p>{scholarship.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits Section */}
              {scholarship.benefits && scholarship.benefits.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Benefits
                  </h2>
                  <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-xl border border-amber-100">
                    <p className="text-amber-800 font-medium">
                      {scholarship.benefits.join(", ")}
                    </p>
                  </div>
                </div>
              )}

              {/* Documents Section */}
              {scholarship.documentsRequired &&
                scholarship.documentsRequired.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Documents
                    </h2>
                    <ul className="space-y-2">
                      {scholarship.documentsRequired.map((doc, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <span className="text-blue-500 font-bold mt-1">
                            •
                          </span>
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Dates Section - Compact */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Start Date</p>
                  <p className="font-medium text-gray-900">
                    {formatDate(scholarship.applicationStartDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Deadline</p>
                  <p className="font-medium text-amber-600">
                    {formatDate(scholarship.applicationDeadline)}
                  </p>
                </div>
              </div>

              {/* Apply Button */}
              <div className="pt-4">
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2">
                  <span>Apply for this Scholarship</span>
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ScholarshipDetailsModal;
