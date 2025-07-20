import PhrasesArray from "../data/PhrasesArray";

export default function CategorySelector({
  selectedId,
  setSelectedId,
  resetTranscript,
}) {
  return (
    <div id="category_selector">
      <div className="flex justify-between gap-2 flex-row items-center sm:gap-4">
        <label
          htmlFor="category_selection"
          className="pr-5 text-base font-semibold text-gray-900 dark:text-gray-100 sm:text-lg"
        >
          Category
        </label>
        <select
          name="category_selection"
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
            resetTranscript();
          }}
          className="w-full md:max-w-52 p-3 sm:p-2 border rounded bg-neutral-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-base"
        >
          {PhrasesArray.map((item) => (
            <option key={item.id} value={item.id}>
              {item.context}: {item.category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
