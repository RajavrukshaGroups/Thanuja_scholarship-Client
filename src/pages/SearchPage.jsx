import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState, useMemo } from "react";
import debounce from "lodash.debounce";
import FiltersSidebar from "../components/FiltersSidebar";
import api from "../utils/api";
import Spinner from "../components/Spinner";
import "./searchPage.css";

export const SearchPage = () => {
  const [scholarships, setScholarships] = useState([]);

  const [fields, setFields] = useState([]);
  const [types, setTypes] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedDegrees, setSelectedDegrees] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSponsors, setSelectedSponsors] = useState([]);

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

  /* ===============================
     DEBOUNCED SEARCH
  =============================== */

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

  /* ===============================
     FETCH FILTER OPTIONS
  =============================== */

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

  /* ===============================
     FETCH SCHOLARSHIPS
  =============================== */

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
      if (reset) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

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

      if (reset) {
        setScholarships(res.data.data);
      } else {
        setScholarships((prev) => [...prev, ...res.data.data]);
      }

      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  /* ===============================
     LOAD MORE
  =============================== */

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchScholarships(nextPage);
  };

  /* ===============================
     CLEAR FILTERS
  =============================== */

  const clearAll = () => {
    setSelectedFields([]);
    setSelectedDegrees([]);
    setSelectedTypes([]);
    setSelectedSponsors([]);
    setPage(1);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-edufin-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-edufin-deep mb-4">
            Find Your Scholarship
          </h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* FILTER SIDEBAR */}

          <div className="lg:col-span-1">
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

          <div className="lg:col-span-3">
            {/* SEARCH BAR */}

            <div className="sticky z-30 bg-edufin-bg py-4 top-class">
              <div className="bg-white p-4 rounded-2xl shadow-md border flex items-center">
                <Search className="text-slate-400 mr-3" size={20} />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    debouncedSearchHandler(value);
                  }}
                  placeholder="Search scholarships..."
                  className="w-full py-2 focus:outline-none"
                />
              </div>
            </div>

            {/* RESULTS */}

            {loading ? (
              <Spinner />
            ) : (
              <div className="grid gap-6">
                {scholarships.map((scholarship, i) => (
                  <motion.div
                    key={scholarship._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white p-6 rounded-2xl border shadow-sm"
                  >
                    <h3 className="text-lg font-bold mb-2">
                      {scholarship.name}
                    </h3>

                    <p className="text-sm text-slate-500 mb-4">
                      {scholarship.description}
                    </p>

                    <button className="bg-edufin-deep text-white px-5 py-2 rounded-xl">
                      View Details
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* LOAD MORE */}

            {page < totalPages && (
              <div className="flex justify-center mt-10">
                {loadingMore ? (
                  <Spinner />
                ) : (
                  <button
                    onClick={loadMore}
                    className="bg-edufin-deep text-white px-6 py-3 rounded-xl font-bold"
                  >
                    Load More
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
