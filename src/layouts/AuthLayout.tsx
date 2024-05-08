import { Logo } from "@/components/shared"
import ToastComponent from "@/components/ui/Toast"
import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <>
      <div className="bg-gray-800 min-h-screen dark:bg-slate-900">
        <div className="py-5 lg:py-10 mx-auto w-[350px]">
          <Logo/>
          <div className="mt-10">
            <Outlet/>
          </div>
        </div>
      </div>
      <ToastComponent/>
    </>
  )
}
