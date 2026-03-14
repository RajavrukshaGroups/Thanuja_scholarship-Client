import { motion, AnimatePresence } from "motion/react";
import { X, FileText, CheckCircle } from "lucide-react";
import { FiAward, FiCalendar, FiMapPin, FiChevronRight } from "react-icons/fi";
import { MdOutlineSchool, MdOutlineEmojiEvents } from "react-icons/md";
import { FaUniversity, FaGraduationCap, FaRegClock } from "react-icons/fa";

const ScholarshipDetailsDrawer = ({ isOpen, onClose, scholarship }) => {
  if (!scholarship) return null;

  const handleUpload = async (e, documentName) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("document", file);
    formData.append("documentName", documentName);
    formData.append("scholarshipId", scholarship._id);

    try {
      await api.post("/scholar/user/scholar/upload-document", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Document uploaded successfully");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-[480px] bg-gradient-to-b from-white to-gray-50 shadow-2xl z-50 overflow-y-auto"
          >
            {/* Decorative top gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-amber-500" />

            {/* Header with gradient background */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10">
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <MdOutlineEmojiEvents className="text-white text-lg" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Scholarship Details
                    </h2>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Complete information about this opportunity
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-all hover:scale-110 group"
                >
                  <X
                    size={18}
                    className="text-gray-400 group-hover:text-gray-600"
                  />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8 pb-10">
              {/* Scholarship Name with Premium Styling */}
              <div className="bg-gradient-to-br from-blue-50 to-amber-50/30 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 flex-shrink-0">
                    <FaUniversity className="text-white text-2xl" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">
                      {scholarship.name}
                    </h3>
                    {scholarship.catchyPhrase && (
                      <p className="text-amber-600 text-sm italic">
                        "{scholarship.catchyPhrase}"
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Eligibility Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center shadow-md">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    Eligibility Criteria
                  </h4>
                </div>

                <div className="space-y-3">
                  {scholarship.eligibilityCriteria?.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative bg-white rounded-xl border border-gray-200 hover:border-amber-200 hover:shadow-md transition-all p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                        </span>
                        <span className="text-sm text-gray-700 flex-1 leading-relaxed">
                          {item}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Documents Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                    <FileText size={16} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900">
                    Documents Required
                  </h4>
                </div>

                <div className="space-y-3">
                  {scholarship.documentsRequired?.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white border rounded-xl p-4"
                    >
                      <span className="text-sm text-gray-700">{doc}</span>

                      <label className="cursor-pointer">
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleUpload(e, doc)}
                        />

                        <span className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700">
                          Upload
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Info - Only if available */}
              {(scholarship.coverageArea ||
                scholarship.applicationStartDate) && (
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    Additional Information
                  </h4>
                  <div className="space-y-3">
                    {scholarship.coverageArea && (
                      <div className="flex items-center gap-3 text-sm">
                        <FiMapPin className="text-blue-500" size={16} />
                        <span className="text-gray-600">
                          Coverage:{" "}
                          <span className="font-medium text-gray-900">
                            {scholarship.coverageArea}
                          </span>
                        </span>
                      </div>
                    )}
                    {scholarship.applicationStartDate && (
                      <div className="flex items-center gap-3 text-sm">
                        <FaRegClock className="text-amber-500" size={16} />
                        <span className="text-gray-600">
                          Start Date:{" "}
                          <span className="font-medium text-gray-900">
                            {new Date(
                              scholarship.applicationStartDate,
                            ).toLocaleDateString()}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Apply Button */}
              <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-4 pb-2">
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 group">
                  <span>Apply for this Scholarship</span>
                  <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ScholarshipDetailsDrawer;
