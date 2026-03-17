import { motion, AnimatePresence } from "motion/react";
import { X, FileText, CheckCircle } from "lucide-react";
import { FiAward, FiCalendar, FiMapPin, FiChevronRight } from "react-icons/fi";
import { MdOutlineSchool, MdOutlineEmojiEvents } from "react-icons/md";
import { FaUniversity, FaGraduationCap, FaRegClock } from "react-icons/fa";
import { useState, useEffect } from "react";
import api from "../utils/api";

const ScholarshipDetailsDrawer = ({
  isOpen,
  onClose,
  scholarship,
  onOpenUploadModal,
  onApplicationSuccess,
}) => {
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [applicationStatus, setApplicationStatus] = useState(null);
  console.log("uploaded documents", uploadedDocs);
  console.log("scholarships details", scholarship);

  const isApplied = applicationStatus?.applied;
  const status = applicationStatus?.status;
  const isRejected = status === "rejected";

  const fetchUserDocuments = async () => {
    try {
      const res = await api.get("/scholar/user/scholar/documents");
      setUploadedDocs(res.data.documents);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchApplicationStatus = async () => {
    try {
      const res = await api.get(
        `/scholar/user/scholar/application-status/${scholarship._id}`,
      );

      setApplicationStatus(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isOpen && scholarship?._id) {
      fetchUserDocuments();
      fetchApplicationStatus();
    }
  }, [isOpen, scholarship]);

  const getDocumentStatus = (docName) => {
    const found = uploadedDocs.find(
      (d) => d.document?.documentName === docName,
    );

    return found ? found.document.verificationStatus : null;
  };

  if (!scholarship) return null;

  const totalDocs = scholarship?.documentsRequired?.length;
  console.log("total documents", scholarship);

  const uploadedCount = scholarship?.documentsRequired.filter((doc) =>
    uploadedDocs.some((d) => d.document?.documentName === doc.title),
  ).length;

  const allDocsUploaded = uploadedCount === totalDocs;

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

              {applicationStatus?.applied && (
                <div className="text-xs p-3 rounded-lg border">
                  Status:{" "}
                  <span className="font-semibold capitalize">
                    {applicationStatus.status}
                  </span>
                </div>
              )}

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
                  {/* {scholarship.documentsRequired?.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-white border rounded-xl p-4"
                    >
                      <span className="text-sm text-gray-700">{doc}</span>
                    </div>
                  ))} */}
                  {scholarship.documentsRequired?.map((doc, index) => {
                    const status = getDocumentStatus(doc.title);

                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-between rounded-xl p-4 border
        ${
          status === "verified"
            ? "border-green-300 bg-green-50"
            : status === "pending"
              ? "border-yellow-300 bg-yellow-50"
              : status === "rejected"
                ? "border-red-300 bg-red-50"
                : "border-gray-200 bg-white"
        }
      `}
                      >
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-700">
                            {doc.title}
                          </span>

                          {status === "verified" && (
                            <span className="text-xs text-green-600">
                              ✔ Verified
                            </span>
                          )}

                          {status === "pending" && (
                            <span className="text-xs text-yellow-600">
                              ⏳ Under Review
                            </span>
                          )}

                          {status === "rejected" && (
                            <span className="text-xs text-red-600">
                              ❌ Rejected
                            </span>
                          )}

                          {!status && (
                            <span className="text-xs text-gray-400">
                              Not uploaded
                            </span>
                          )}
                        </div>

                        <button
                          // onClick={onOpenUploadModal}
                          onClick={() => {
                            onClose();

                            setTimeout(() => {
                              onOpenUploadModal();
                            }, 200); // match drawer animation
                          }}
                          className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                        >
                          Upload
                        </button>
                      </div>
                    );
                  })}
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

              {!allDocsUploaded && (
                <div className="text-xs text-amber-600 bg-amber-50 border border-amber-200 p-3 rounded-lg">
                  ⚠️ You can apply now, but some documents are missing. Your
                  application may remain under review until all documents are
                  uploaded.
                </div>
              )}

              {/* Apply Button */}
              <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-4 pb-2">
                {/* <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3.5 rounded-xl font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all hover:scale-[1.01] flex items-center justify-center gap-2 group">
                  <span>Apply for this Scholarship</span>
                  <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button> */}

                <button
                  disabled={isApplied && !isRejected}
                  onClick={async () => {
                    try {
                      await api.post("/scholar/user/scholar/apply", {
                        scholarshipId: scholarship._id,
                      });

                      alert("Application submitted successfully 🎉");

                      onApplicationSuccess && onApplicationSuccess(); // refresh
                      onClose();
                    } catch (err) {
                      console.log(err);
                      alert("Failed to apply");
                    }
                  }}
                  className={`w-full py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition
    ${
      isApplied && !isRejected
        ? "bg-gray-400 cursor-not-allowed text-white"
        : isRejected
          ? "bg-red-600 text-white"
          : allDocsUploaded
            ? "bg-green-600 text-white"
            : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
    }
  `}
                >
                  <span>
                    {!isApplied
                      ? allDocsUploaded
                        ? "Apply Now (Ready)"
                        : "Apply Now (Documents Pending)"
                      : isRejected
                        ? "Re-Apply"
                        : status === "submitted"
                          ? "Submitted"
                          : status === "under_review"
                            ? "Under Review"
                            : status === "approved"
                              ? "Approved ✅"
                              : "Applied"}
                  </span>
                  {!isApplied || isRejected ? <FiChevronRight /> : null}
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
