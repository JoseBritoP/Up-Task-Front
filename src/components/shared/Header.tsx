import { Link } from "react-router-dom";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import DarkMode from "./DarkMode";
import { AuthenticateType } from "@/schema/AuthSchema";

interface HeaderProps {
  user:AuthenticateType
}

export default function Header({user}:HeaderProps) {
  return (
    <header className="bg-gray-800 dark:bg-slate-950">
      <div className="max-w-screen-2xl mx-auto flex flex-row justify-between pl-5 pr-16 lg:px-0 items-center pb-5 lg:pb-0">
        <div className="w-64">
          <Link to={'/projects'}>
            <Logo/>
          </Link>
        </div>
        <div className="flex justify-between items-center gap-x-5 pr-4">
          <DarkMode/>
          <NavMenu user={user}/>
        </div>
      </div>
    </header>
  )
}
