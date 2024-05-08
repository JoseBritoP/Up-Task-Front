import Tabs from "@/components/shared/profile/Tabs"
import { Outlet } from "react-router-dom"

export default function ProfileLayout() {
  return (
    <>
      <Tabs/>
      <Outlet/>
    </>
  )
}
