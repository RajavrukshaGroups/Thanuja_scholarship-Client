import { Filter } from "lucide-react";

const FiltersSidebar = ({
  fields,
  types,
  sponsors,
  selectedFields,
  selectedDegrees,
  selectedTypes,
  selectedSponsors,
  setSelectedFields,
  setSelectedDegrees,
  setSelectedTypes,
  setSelectedSponsors,
  clearAll,
}) => {
  const toggleSelection = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter((item) => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const degreeLevels = ["Undergraduate", "Postgraduate", "PhD"];

  return (
    <div className="sticky top-32">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h3 className="font-bold flex items-center gap-2 text-edufin-deep">
            <Filter size={18} /> Filters
          </h3>

          <button
            onClick={clearAll}
            className="text-xs text-edufin-royal font-bold"
          >
            Clear All
          </button>
        </div>

        {/* SCROLLABLE FILTER AREA */}
        <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-6">
          {/* FIELD OF FOCUS */}
          <div>
            <label className="block text-sm font-bold mb-3">
              Field of Focus
            </label>

            <div className="space-y-2">
              {fields.map((field) => (
                <label
                  key={field._id}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedFields.includes(field._id)}
                    onChange={() =>
                      toggleSelection(
                        field._id,
                        selectedFields,
                        setSelectedFields,
                      )
                    }
                    className="rounded border-slate-300 text-edufin-royal"
                  />

                  {field.name}
                </label>
              ))}
            </div>
          </div>

          {/* SCHOLARSHIP TYPE */}
          <div>
            <label className="block text-sm font-bold mb-3">
              Scholarship Type
            </label>

            <div className="space-y-3">
              {types.map((type) => {
                const isSelected = selectedTypes.includes(type._id);
                const isPostMetric = type.title.toLowerCase().includes("post");

                return (
                  <div key={type._id}>
                    {/* TYPE CHECKBOX */}
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() =>
                          toggleSelection(
                            type._id,
                            selectedTypes,
                            setSelectedTypes,
                          )
                        }
                        className="rounded border-slate-300 text-edufin-royal"
                      />

                      {type.title}
                    </label>

                    {/* DEGREE OPTIONS UNDER POST METRIC */}
                    {isSelected && isPostMetric && (
                      <div className="ml-6 mt-2 space-y-2">
                        {degreeLevels.map((degree) => (
                          <label
                            key={degree}
                            className="flex items-center gap-2 text-sm cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={selectedDegrees.includes(degree)}
                              onChange={() =>
                                toggleSelection(
                                  degree,
                                  selectedDegrees,
                                  setSelectedDegrees,
                                )
                              }
                              className="rounded border-slate-300 text-edufin-royal"
                            />

                            {degree}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* SPONSORS */}
          <div>
            <label className="block text-sm font-bold mb-3">Sponsors</label>

            <div className="space-y-2">
              {sponsors.map((sponsor) => (
                <label
                  key={sponsor._id}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSponsors.includes(sponsor._id)}
                    onChange={() =>
                      toggleSelection(
                        sponsor._id,
                        selectedSponsors,
                        setSelectedSponsors,
                      )
                    }
                    className="rounded border-slate-300 text-edufin-royal"
                  />

                  {sponsor.title}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
