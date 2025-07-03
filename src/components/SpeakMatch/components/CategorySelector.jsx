import PhrasesArray from "../data/PhrasesArray";

export default function CategorySelector(selectedId, setSelectedId, resetTranscript) {
  
  return(
    <div>
          <div className="flex justify-between flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <label
              htmlFor="category_selection"
              className="text-base font-semibold text-gray-900 dark:text-gray-100 sm:text-lg"
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
              className="max-w-54 p-2 border rounded bg-neutral-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 sm:text-base"
            >
              {PhrasesArray.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.context}: {item.category}
                </option>
              ))}
            </select>
          </div>
          </div>
  )
}