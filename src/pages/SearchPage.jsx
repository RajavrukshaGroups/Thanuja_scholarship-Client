import { Search } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import FiltersSidebar from "../components/FiltersSidebar";
import api from "../utils/api";

export const SearchPage = () => {
  const [scholarships, setScholarships] = useState([]);

  const [fields, setFields] = useState([]);
  const [types, setTypes] = useState([]);
  const [sponsors, setSponsors] = useState([]);

  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedDegrees, setSelectedDegrees] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSponsors, setSelectedSponsors] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  /* ===============================
     FETCH FILTER OPTIONS
  =============================== */

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [fieldsRes, typesRes, sponsorsRes] = await Promise.all([
          api.get("/scholar/dropdown/fields"),
          api.get("/scholar/dropdown/types"),
          api.get("/scholar/dropdown/sponsors"),
        ]);

        setFields(fieldsRes.data.data);
        setTypes(typesRes.data.data);
        setSponsors(sponsorsRes.data.data);
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
    fetchScholarships();
  }, [selectedFields, selectedDegrees, selectedTypes, selectedSponsors]);

  const fetchScholarships = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (searchTerm) params.append("search", searchTerm);

      if (selectedFields.length)
        params.append("fields", selectedFields.join(","));

      if (selectedDegrees.length)
        params.append("degreeLevels", selectedDegrees.join(","));

      if (selectedTypes.length) params.append("types", selectedTypes.join(","));

      if (selectedSponsors.length)
        params.append("sponsors", selectedSponsors.join(","));

      const res = await api.get(`/scholar/scholarships?${params.toString()}`);

      setScholarships(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     CLEAR ALL FILTERS
  =============================== */

  const clearAll = () => {
    setSelectedFields([]);
    setSelectedDegrees([]);
    setSelectedTypes([]);
    setSelectedSponsors([]);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-edufin-bg">
      <div className="max-w-7xl mx-auto px-6">
        {/* PAGE TITLE */}
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

          {/* RESULTS SECTION */}
          <div className="lg:col-span-3">
            {/* SEARCH BAR */}
            <div className="sticky top-32 z-30 bg-edufin-bg py-4">
              <div className="bg-white p-4 rounded-2xl shadow-md border flex gap-4">
                <div className="flex-1 flex items-center px-4">
                  <Search className="text-slate-400 mr-3" size={20} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search scholarships..."
                    className="w-full py-2 focus:outline-none"
                  />
                </div>

                <button
                  onClick={fetchScholarships}
                  className="bg-edufin-deep text-white px-6 py-2.5 rounded-xl font-bold"
                >
                  Search
                </button>
              </div>
            </div>

            {/* RESULTS */}

            {loading ? (
              <p>Loading scholarships...</p>
            ) : scholarships.length === 0 ? (
              <p>No scholarships found.</p>
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
          </div>
        </div>
      </div>
    </div>
  );
};
