import { useTheme } from '../context/ThemeContext';

export default function DarkModeToggle() {
  const { darkMode, setDarkMode } = useTheme();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-lg transition-all duration-300 ease-in-out 
        hover:bg-gray-100 dark:hover:bg-gray-800 
        text-gray-800 dark:text-gray-200"
      title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="transition-transform duration-600 inline-block">
        {darkMode ? '☀️' : '🌙'}
      </span>
    </button>
  );
}