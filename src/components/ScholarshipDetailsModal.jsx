import { motion, AnimatePresence } from "motion/react";
import { useSelector } from "react-redux";
import {
  FiX,
  FiCalendar,
  FiMapPin,
  FiChevronRight,
  FiInfo,
  FiCheckCircle,
} from "react-icons/fi";
import { MdOutlineSchool } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";

const ScholarshipDetailsModal = ({ isOpen, onClose, scholarship, onApply }) => {
  if (!scholarship) return null;

  const selectedScholarships = useSelector(
    (state) => state.application.selectedScholarships,
  );

  const isSelected = selectedScholarships?.some(
    (s) => s._id === scholarship?._id,
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1,
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-[#0a1929]/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* DRAWER */}
          <motion.div
            className="fixed top-0 right-0 w-[520px] max-w-full h-full bg-white z-50 shadow-2xl overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Top Bar */}
            <div className="h-1 bg-gradient-to-r from-blue-500 to-amber-500" />

            {/* HEADER */}
            <div className="sticky top-0 bg-white border-b border-gray-100 z-10 px-5 py-4 flex justify-between items-start">
              <div className="pr-4">
                <h1 className="text-xl font-semibold text-gray-900">
                  {scholarship.name}
                </h1>

                {scholarship.catchyPhrase && (
                  <p className="text-gray-600 text-sm mt-1">
                    {scholarship.catchyPhrase}
                  </p>
                )}

                {/* Already Selected Badge */}
                {isSelected && (
                  <div className="flex items-center gap-1 text-green-600 text-xs font-semibold mt-2">
                    <FiCheckCircle size={14} />
                    Already Selected
                  </div>
                )}
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 rounded-md hover:bg-gray-100 flex items-center justify-center"
              >
                <FiX className="text-gray-500 text-lg" />
              </button>
            </div>

            {/* CONTENT */}
            <div className="px-5 py-4 space-y-5 text-sm">
              {/* Quick Info Pills */}
              <div className="flex flex-wrap gap-2">
                {scholarship.coverageArea && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                    <FiMapPin size={12} />
                    {scholarship.coverageArea}
                  </span>
                )}

                {scholarship.type?.length > 0 && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">
                    <MdOutlineSchool size={12} />
                    {scholarship.type.map((t) => t.title).join(", ")}
                  </span>
                )}

                {scholarship.fieldOfStudy && (
                  <span className="flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
                    <GiGraduateCap size={12} />
                    {scholarship.fieldOfStudy.name}
                  </span>
                )}
              </div>

              {/* Eligibility */}
              {scholarship.eligibilityCriteria?.length > 0 && (
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">
                    Eligibility
                  </h2>
                  <ul className="space-y-1 text-gray-700">
                    {scholarship.eligibilityCriteria.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-amber-500">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Notes */}
              {scholarship.notes && (
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                  <div className="flex gap-2">
                    <FiInfo className="text-amber-500 mt-[2px]" size={14} />
                    <div className="text-xs text-amber-800 space-y-1">
                      {Array.isArray(scholarship.notes)
                        ? scholarship.notes.map((note, i) => (
                            <p key={i}>{note}</p>
                          ))
                        : scholarship.notes}
                    </div>
                  </div>
                </div>
              )}

              {/* Benefits */}
              {scholarship.benefits?.length > 0 && (
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">Benefits</h2>
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-amber-800 text-xs">
                    {scholarship.benefits.join(", ")}
                  </div>
                </div>
              )}

              {/* Documents */}
              {scholarship.documentsRequired?.length > 0 && (
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">
                    Documents Required
                  </h2>
                  <ul className="space-y-1 text-gray-700 text-xs">
                    {scholarship.documentsRequired.map((doc, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-blue-500">•</span>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 text-xs pt-1">
                <div>
                  <p className="text-gray-500">Start Date</p>
                  <p className="font-medium">
                    {formatDate(scholarship.applicationStartDate)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Deadline</p>
                  <p className="font-medium text-amber-600">
                    {formatDate(scholarship.applicationDeadline)}
                  </p>
                </div>
              </div>

              {/* Apply Button */}
              <button
                onClick={() => {
                  onApply(scholarship);
                  onClose();
                }}
                className={`w-full py-2.5 rounded-lg text-sm font-semibold transition
                  ${
                    isSelected
                      ? "bg-green-600 text-white"
                      : "bg-gradient-to-r from-blue-600 to-amber-500 text-white hover:opacity-90"
                  }`}
              >
                {isSelected ? "Selected" : "Apply For This Scholarship"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ScholarshipDetailsModal;
