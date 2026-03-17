import { motion, AnimatePresence } from "motion/react";
import { X, Upload, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../utils/api";

const UploadDocumentsModal = ({ isOpen, onClose, documents }) => {
  const [files, setFiles] = useState({});
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ===============================
     FETCH USER DOCUMENTS
  =============================== */

  const fetchUserDocuments = async () => {
    try {
      const res = await api.get("/scholar/user/scholar/documents");
      setUploadedDocs(res.data.documents);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchUserDocuments();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setFiles({});
    }
  }, [isOpen]);

  /* ===============================
     HANDLE FILE SELECT
  =============================== */

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  const handleUpload = (e, doc) => {
    const file = e.target.files[0];
    if (!file) return;

    // ✅ FILE SIZE CHECK
    if (file.size > MAX_FILE_SIZE) {
      alert("File size should be less than 5MB");
      return;
    }

    // ✅ FILE TYPE CHECK (VERY IMPORTANT)
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, JPG, PNG files are allowed");
      return;
    }

    setFiles((prev) => ({
      ...prev,
      [doc]: file,
    }));
  };

  /* ===============================
     HANDLE SUBMIT
  =============================== */

  const handleSubmit = async () => {
    try {
      if (Object.keys(files).length === 0) {
        alert("Please upload at least one document");
        return;
      }

      setLoading(true);

      const formData = new FormData();

      Object.entries(files).forEach(([docName, file]) => {
        formData.append("documents", file);
        formData.append("documentNames", docName);
      });

      await api.post("/scholar/user/scholar/upload-document", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Documents uploaded successfully 🎉");

      setFiles({});

      fetchUserDocuments();

      onClose();
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     GET DOCUMENT STATUS
  =============================== */

  const getDocumentStatus = (docName) => {
    const found = uploadedDocs.find(
      (d) => d.document?.documentName === docName,
    );

    return found ? found.document.verificationStatus : null;
  };

  /* ===============================
     GET FILE URL
  =============================== */

  const getFileUrl = (docName) => {
    const found = uploadedDocs.find(
      (d) => d.document?.documentName === docName,
    );

    return found?.fileUrl;
  };

  const getStatusPriority = (docName) => {
    const status = getDocumentStatus(docName);

    if (status === "verified") return 1;
    if (status === "pending") return 2;
    if (status === "rejected") return 3;

    return 4; // not uploaded
  };

  const sortedDocuments = [...documents].sort((a, b) => {
    return getStatusPriority(a) - getStatusPriority(b);
  });

  /* ===============================
   DOCUMENT PROGRESS
=============================== */

  const uploadedCount = documents.filter((doc) =>
    uploadedDocs.some((d) => d.document?.documentName === doc.title),
  ).length;

  const totalDocs = documents.length;

  const progressPercent =
    totalDocs === 0 ? 0 : Math.round((uploadedCount / totalDocs) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-xl relative z-[10000]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            {/* HEADER */}

            {/* DOCUMENT PROGRESS */}

            <div className="px-6 pt-4">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Document Completion</span>
                <span>
                  {uploadedCount}/{totalDocs}
                </span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.4 }}
                  className={`h-2 ${
                    progressPercent === 100
                      ? "bg-green-500"
                      : "bg-gradient-to-r from-blue-600 to-amber-500"
                  }`}
                />
              </div>

              <p className="text-xs text-gray-500 mt-1">
                {progressPercent}% completed
              </p>
            </div>

            {/* DOCUMENT LIST */}

            <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
              {sortedDocuments.map((doc, i) => {
                const uploadedFile = files[doc.title];
                const status = getDocumentStatus(doc.title);
                const fileUrl = getFileUrl(doc.title);

                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between rounded-xl p-4 border
${
  status === "verified"
    ? "border-green-300 bg-green-50"
    : status === "pending"
      ? "border-yellow-300 bg-yellow-50"
      : status === "rejected"
        ? "border-red-300 bg-red-50"
        : "border-gray-200"
}`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">
                        {doc.title}
                      </span>

                      {/* STATUS DISPLAY */}

                      {status === "verified" && (
                        <span className="text-xs text-green-600 mt-1">
                          ✔ Verified
                        </span>
                      )}

                      {status === "pending" && (
                        <span className="text-xs text-yellow-600 mt-1">
                          ⏳ Under Review
                        </span>
                      )}

                      {status === "rejected" && (
                        <span className="text-xs text-red-600 mt-1">
                          ❌ Rejected
                        </span>
                      )}

                      {!status && (
                        <span className="text-xs text-gray-400 mt-1">
                          Not uploaded
                        </span>
                      )}
                      <p className="text-[10px] text-black-400 mt-1">
                        Max 5MB • PDF, JPG, PNG
                      </p>
                    </div>

                    {/* UPLOAD BUTTON */}

                    {/* <label
                      className={`cursor-pointer text-xs px-4 py-2 rounded-lg flex items-center gap-1 font-medium transition
                      ${
                        uploadedFile
                          ? "bg-amber-500 hover:bg-amber-600 text-white"
                          : "bg-blue-600 hover:bg-blue-700 text-white"
                      }`}
                    >
                      <Upload size={14} />
                      {uploadedFile ? "Re-upload" : "Upload"}

                      <input
                        type="file"
                        hidden
                        onChange={(e) => handleUpload(e, doc.title)}
                      />
                    </label> */}
                    <div className="flex flex-col items-end gap-1">
                      {/* FILE NAME */}
                      {uploadedFile && (
                        <span className="text-[10px] text-gray-600 max-w-[120px] truncate">
                          {uploadedFile.name}
                        </span>
                      )}

                      <label
                        className={`cursor-pointer text-xs px-4 py-2 rounded-lg flex items-center gap-1 font-medium transition
    ${
      uploadedFile
        ? "bg-amber-500 hover:bg-amber-600 text-white"
        : "bg-blue-600 hover:bg-blue-700 text-white"
    }`}
                      >
                        <Upload size={14} />
                        {uploadedFile ? "Re-upload" : "Upload"}

                        <input
                          type="file"
                          hidden
                          onChange={(e) => handleUpload(e, doc.title)}
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* FOOTER */}

            <div className="flex justify-end gap-3 px-6 py-4 border-t">
              <button
                // onClick={onClose}
                onClick={() => {
                  setFiles({});
                  onClose();
                }}
                className="px-4 py-2 text-sm rounded-lg border text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 text-sm rounded-lg bg-gradient-to-r from-blue-600 to-amber-500 text-white font-medium hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Uploading..." : "Submit Documents"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UploadDocumentsModal;
