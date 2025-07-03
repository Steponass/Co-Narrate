

const LANGUAGES = [
  { value: "en-US", label: "EN-US" },
  { value: "en-GB", label: "EN-UK" },
  { value: "en-AU", label: "EN-AU" },
  { value: "en-IN", label: "EN-IN" },
];

export default function LanguageSelector({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="p-2 border rounded bg-neutral-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
