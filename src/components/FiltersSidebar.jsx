import { Filter } from "lucide-react";

const FiltersSidebar = ({
  fields,
  types,
  sponsors,
  filterStats,
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
    <div className="sticky top-32 h-[calc(100vh-8rem)]">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col">
        {/* HEADER */}
        <div className="flex justify-between mb-6 flex-shrink-0">
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

        {/* SCROLLABLE AREA */}
        <div className="overflow-y-auto pr-2 space-y-6 flex-1">
          {/* FIELD OF FOCUS */}
          <div>
            <label className="block text-sm font-bold mb-3">
              Field of Focus
            </label>

            <div className="space-y-2">
              {fields.map((field) => {
                const stat = filterStats?.fields?.find(
                  (f) => f.name === field.name,
                );

                const count = stat?.count || 0;

                return (
                  <label
                    key={field._id}
                    className="flex items-center justify-between text-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
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
                    </div>

                    <span className="text-gray-400 text-xs">({count})</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* SCHOLARSHIP TYPE */}
          <div>
            <label className="block text-sm font-bold mb-3">
              Scholarship Type
            </label>

            <div className="space-y-3">
              {types.map((type) => {
                const stat = filterStats?.types?.find(
                  (t) => t.title === type.title,
                );

                const count = stat?.count || 0;

                const isSelected = selectedTypes.includes(type._id);
                const isPostMetric = type.title.toLowerCase().includes("post");

                return (
                  <div key={type._id}>
                    <label className="flex items-center justify-between text-sm cursor-pointer">
                      <div className="flex items-center gap-2">
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
                      </div>

                      <span className="text-gray-400 text-xs">({count})</span>
                    </label>

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
