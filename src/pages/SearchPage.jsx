import { Search } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import FiltersSidebar from "../components/FiltersSidebar";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import { FiChevronRight, FiCalendar, FiTrendingUp } from "react-icons/fi";
import { MdOutlineEmojiEvents } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import "./searchPage.css";
import ScholarshipDetailsModal from "../components/ScholarshipDetailsModal";
import MemberPlans from "../components/MemberPlans";
import { toast } from "sonner";
import { motion } from "motion/react";

import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedPlan,
  addScholarship,
  removeScholarship,
} from "../../store/applicationSlice";

export const SearchPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedPlan = useSelector((state) => state.application.selectedPlan);
  const selectedScholarships = useSelector(
    (state) => state.application.selectedScholarships,
  );

  const [scholarships, setScholarships] = useState([]);

  const [fields, setFields] = useState([]);
  const [types, setTypes] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedDegrees, setSelectedDegrees] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSponsors, setSelectedSponsors] = useState([]);

  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const [filterStats, setFilterStats] = useState({
    fields: [],
    types: [],
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const decorativeElements = (
    <>
      <div className="fixed top-0 left-0 w-full h-80 bg-gradient-to-br from-blue-50/50 to-amber-50/50 -z-10" />
      <div className="fixed top-1/3 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10" />
      <div className="fixed bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -z-10" />
    </>
  );

  const debouncedSearchHandler = useMemo(
    () =>
      debounce((value) => {
        setDebouncedSearch(value);
        setPage(1);
      }, 500),
    [],
  );

  useEffect(() => {
    return () => debouncedSearchHandler.cancel();
  }, [debouncedSearchHandler]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [fieldsRes, typesRes, sponsorsRes, statsRes] = await Promise.all([
          api.get("/scholar/dropdown/fields"),
          api.get("/scholar/dropdown/types"),
          api.get("/scholar/dropdown/sponsors"),
          api.get("/scholar/filter-stats"),
        ]);

        setFields(fieldsRes.data.data);
        setTypes(typesRes.data.data);
        setSponsors(sponsorsRes.data.data);
        setFilterStats(statsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    setPage(1);
    fetchScholarships(1, true);
  }, [
    selectedFields,
    selectedDegrees,
    selectedTypes,
    selectedSponsors,
    debouncedSearch,
  ]);

  const fetchScholarships = async (pageNumber = page, reset = false) => {
    try {
      if (reset) setLoading(true);
      else setLoadingMore(true);

      const params = new URLSearchParams();
      params.append("page", pageNumber);

      if (debouncedSearch) params.append("search", debouncedSearch);
      if (selectedFields.length)
        params.append("fields", selectedFields.join(","));
      if (selectedDegrees.length)
        params.append("degreeLevels", selectedDegrees.join(","));
      if (selectedTypes.length) params.append("types", selectedTypes.join(","));
      if (selectedSponsors.length)
        params.append("sponsors", selectedSponsors.join(","));

      const res = await api.get(`/scholar/scholarships?${params.toString()}`);

      if (reset) setScholarships(res.data.data);
      else setScholarships((prev) => [...prev, ...res.data.data]);

      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchScholarships(nextPage);
  };

  const handleSelectScholarship = (scholarship) => {
    if (!selectedPlan) {
      toast.error("Select a membership plan first");
      return;
    }

    const alreadySelected = selectedScholarships.some(
      (s) => s._id === scholarship._id,
    );

    if (
      selectedScholarships.length >= selectedPlan.maxScholarships &&
      !alreadySelected
    ) {
      toast.warning(
        `You can select only ${selectedPlan.maxScholarships} scholarships`,
      );
      return;
    }

    if (alreadySelected) {
      dispatch(removeScholarship(scholarship._id));
      toast("Scholarship removed from your list");
    } else {
      dispatch(addScholarship(scholarship));
      toast.success("Scholarship added to your list");
    }
  };

  const clearAll = () => {
    setSelectedFields([]);
    setSelectedDegrees([]);
    setSelectedTypes([]);
    setSelectedSponsors([]);
    setPage(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1,
    ).padStart(2, "0")}/${date.getFullYear()}`;
  };

  const isDeadlineNear = (deadline) => {
    const diffDays = Math.ceil(
      (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24),
    );
    return diffDays <= 30 && diffDays > 0;
  };

  const sortedScholarships = useMemo(() => {
    return [...scholarships].sort((a, b) => {
      const aSelected = selectedScholarships.some((s) => s._id === a._id);
      const bSelected = selectedScholarships.some((s) => s._id === b._id);

      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return 0;
    });
  }, [scholarships, selectedScholarships]);

  return (
    <>
      {decorativeElements}

      <div className="pt-24 pb-12 min-h-screen mt-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* HEADER */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-amber-500 rounded-lg flex items-center justify-center">
                <MdOutlineEmojiEvents className="text-white text-lg" />
              </div>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                Scholarship Portal
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Find Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
                Perfect
              </span>{" "}
              Scholarship
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <FiTrendingUp size={14} /> 500+ Scholarships
              </span>
              <span className="flex items-center gap-1">
                <FaUniversity size={14} /> 100+ Sponsors
              </span>
              <span className="flex items-center gap-1">
                <GiGraduateCap size={14} /> 50+ Fields
              </span>
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_280px] gap-4">
            {/* FILTER */}
            <div className="lg:sticky lg:top-24">
              <FiltersSidebar
                fields={fields}
                types={types}
                sponsors={sponsors}
                filterStats={filterStats}
                selectedFields={selectedFields}
                selectedDegrees={selectedDegrees}
                selectedTypes={selectedTypes}
                selectedSponsors={selectedSponsors}
                setSelectedFields={setSelectedFields}
                setSelectedDegrees={setSelectedDegrees}
                setSelectedTypes={setSelectedTypes}
                setSelectedSponsors={setSelectedSponsors}
                clearAll={clearAll}
              />
            </div>

            {/* RESULTS */}
            <div>
              {selectedPlan && (
                <div className="mb-3 text-sm text-gray-600 font-medium">
                  Selected {selectedScholarships.length} /{" "}
                  {selectedPlan.maxScholarships} scholarships
                </div>
              )}

              {/* SEARCH */}
              <div className="sticky top-20 bg-white/80 backdrop-blur rounded-lg mb-4 p-1 border">
                <div className="flex items-center">
                  <div className="bg-gradient-to-r from-blue-500 to-amber-500 p-2 rounded-lg m-1">
                    <Search className="text-white" size={16} />
                  </div>

                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      debouncedSearchHandler(e.target.value);
                    }}
                    placeholder="Search scholarships..."
                    className="w-full py-2 px-2 text-sm focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              {loading && (
                <div className="flex justify-center py-10">
                  <Spinner />
                </div>
              )}

              {/* CARDS */}
              <div className="space-y-3">
                {/* {scholarships.map((scholarship) => { */}
                {sortedScholarships.map((scholarship) => {
                  const nearDeadline = isDeadlineNear(
                    scholarship.applicationDeadline,
                  );

                  const isSelected = selectedScholarships.some(
                    (s) => s._id === scholarship._id,
                  );

                  return (
                    <div
                      key={scholarship._id}
                      className={`relative bg-white border rounded-lg p-4 flex gap-3 items-start ${
                        isSelected
                          ? "border-green-500 ring-1 ring-green-300"
                          : nearDeadline
                            ? "border-red-500 ring-1 ring-red-300"
                            : "border-gray-200"
                      }`}
                    >
                      {nearDeadline && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] px-2 py-1 rounded-full shadow">
                          Deadline Soon
                        </span>
                      )}

                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <FaUniversity className="text-white" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">
                          {scholarship.name}
                        </h3>

                        <p className="text-xs text-gray-600 line-clamp-2">
                          {scholarship.description}
                        </p>

                        {/* <div className="flex gap-2 text-xs mt-1">
                          <span className="flex items-center gap-1">
                            <FiCalendar size={12} />
                            {formatDate(scholarship.applicationDeadline)}
                          </span>
                        </div> */}
                        <div className="flex flex-wrap gap-3 text-xs mt-2">
                          {/* Application Start Date */}
                          {scholarship.applicationStartDate && (
                            <div className="flex items-center gap-1 text-xs text-gray-600 mt-2">
                              <FiCalendar size={12} />
                              Start:{" "}
                              {formatDate(scholarship.applicationStartDate)}
                            </div>
                          )}{" "}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2 min-w-[120px]">
                        <button
                          onClick={() => {
                            setSelectedScholarship(scholarship);
                            setIsDetailsOpen(true);
                          }}
                          className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-md flex items-center gap-1"
                        >
                          View
                          <FiChevronRight size={12} />
                        </button>

                        <button
                          onClick={() => handleSelectScholarship(scholarship)}
                          className={`text-xs px-3 py-1.5 rounded-md border ${
                            isSelected
                              ? "bg-green-600 text-white border-green-600"
                              : "bg-white border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {isSelected ? "Selected" : "Select"}
                        </button>

                        {/* Deadline */}
                        <div
                          className={`flex items-center gap-1 text-xs ${
                            nearDeadline
                              ? "text-red-600 font-semibold"
                              : "text-gray-600"
                          }`}
                        >
                          <FiCalendar size={12} />
                          Deadline:{" "}
                          {formatDate(scholarship.applicationDeadline)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* <div className="flex justify-between items-center mt-6">
                {page < totalPages && (
                  <button
                    onClick={loadMore}
                    className="px-5 py-2 text-sm font-medium rounded-lg border border-blue-500 text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-600 cursor-pointer transition"
                  >
                    Load More
                  </button>
                )}

                {selectedScholarships.length > 0 && (
                  <button className="bg-gradient-to-r from-blue-600 to-amber-500 text-white px-6 py-2 rounded-lg text-sm font-medium shadow hover:opacity-90 cursor-pointer transition">
                    Next
                  </button>
                )}
              </div> */}
              <div className="flex justify-center mt-6">
                {page < totalPages && (
                  <button
                    onClick={loadMore}
                    className="px-5 py-2 text-sm font-medium rounded-lg border border-blue-500 text-blue-600 bg-white hover:bg-blue-50 hover:border-blue-600 cursor-pointer transition"
                  >
                    Load More
                  </button>
                )}
              </div>
            </div>

            {/* MEMBERSHIP */}
            <div className="lg:sticky lg:top-24">
              {/* <MemberPlans
                selectedPlan={selectedPlan}
                setSelectedPlan={(plan) => dispatch(setSelectedPlan(plan))}
              /> */}
              <MemberPlans
                selectedPlan={selectedPlan}
                setSelectedPlan={(plan) => {
                  if (selectedScholarships.length > plan.maxScholarships) {
                    toast.warning(
                      `Plan allows only ${plan.maxScholarships} scholarships. Extra selections were removed.`,
                    );
                  }

                  dispatch(setSelectedPlan(plan));
                }}
              />
            </div>
          </div>
        </div>

        {/* Floating Next Button */}
        {selectedScholarships.length > 0 && selectedPlan && (
          <div className="fixed bottom-6 right-6 z-50">
            <button
              onClick={() => navigate("/checkout")}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-amber-500 text-white px-6 py-3 rounded-full shadow-xl text-sm font-semibold hover:scale-105 hover:shadow-2xl transition cursor-pointer"
            >
              {selectedScholarships.length} Selected
              <FiChevronRight size={16} />
              Next
            </button>
          </div>
        )}

        <ScholarshipDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          scholarship={selectedScholarship}
          onApply={handleSelectScholarship}
        />
      </div>
    </>
  );
};
