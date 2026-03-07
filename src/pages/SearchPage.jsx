import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState, useMemo } from "react";
import debounce from "lodash.debounce";
import FiltersSidebar from "../components/FiltersSidebar";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import {
  FiChevronRight,
  FiAward,
  FiCalendar,
  FiMapPin,
  FiTrendingUp,
  FiFilter,
} from "react-icons/fi";
import { MdOutlineSchool, MdOutlineEmojiEvents } from "react-icons/md";
import { FaUniversity, FaRegClock } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import "./searchPage.css";
import ScholarshipDetailsModal from "../components/ScholarshipDetailsModal";
import MemberPlans from "../components/MemberPlans";

export const SearchPage = () => {
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

  const [selectedPlan, setSelectedPlan] = useState(null);

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

  return (
    <>
      {decorativeElements}

      <div className="pt-24 pb-12 min-h-screen">
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

            <p className="text-gray-600 text-sm max-w-2xl">
              Discover opportunities that match your academic profile.
            </p>

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

              {/* CARDS */}
              <div className="space-y-3">
                {scholarships.map((scholarship) => {
                  const nearDeadline = isDeadlineNear(
                    scholarship.applicationDeadline,
                  );

                  return (
                    <div
                      key={scholarship._id}
                      className={`relative bg-white border rounded-lg p-4 flex gap-3 items-start ${
                        nearDeadline
                          ? "border-red-500 ring-1 ring-red-300"
                          : "border-black-200"
                      }`}
                    >
                      {/* DEADLINE BADGE */}
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

                        <div className="flex gap-2 text-xs mt-1">
                          <span
                            className={`flex items-center gap-1 ${
                              nearDeadline
                                ? "text-red-600 font-semibold"
                                : "text-black-600"
                            }`}
                          >
                            <FiCalendar size={12} />
                            {formatDate(scholarship.applicationDeadline)}
                          </span>
                        </div>
                      </div>

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
                    </div>
                  );
                })}
              </div>

              {page < totalPages && (
                <div className="flex justify-center mt-4">
                  <button
                    onClick={loadMore}
                    className="px-4 py-2 text-sm border rounded-md"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>

            {/* MEMBERSHIP */}
            <div className="lg:sticky lg:top-24">
              <MemberPlans
                selectedPlan={selectedPlan}
                setSelectedPlan={setSelectedPlan}
              />
            </div>
          </div>
        </div>

        <ScholarshipDetailsModal
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          scholarship={selectedScholarship}
        />
      </div>
    </>
  );
};
