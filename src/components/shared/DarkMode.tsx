import { useThemeValue } from "../../hooks/useDarkThemeValue"

export default function DarkMode() {
  const { value, handleChangeTheme } = useThemeValue();
  return (
    <button aria-label="Dark mode buttom" onClick={handleChangeTheme} className="self-center px-2 text-center font-bold text-slate-900 dark:text-slate-200 focus:text-sky-900 active:text-sky-900 hover:cursor-pointer">
      {value}
    </button>
  )
}
