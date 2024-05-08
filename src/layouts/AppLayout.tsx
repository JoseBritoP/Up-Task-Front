import { Footer, Header } from "@/components/shared"
import ToastComponent from "@/components/ui/Toast"
import useAuth from "@/hooks/auth/useAuth"
import { Navigate, Outlet } from "react-router-dom"

export default function AppLayout() {

  const { data, isError, isLoading } = useAuth();
  if(isLoading) return <p>Loading..</p>
  if(isError || data === undefined) {
    return (<Navigate to={'/auth'}/>)
  }
  if(data) return (
    <>
      <Header user={data}/>
      <section className="max-w-screen-2xl mx-auto mt-10 p-5">
        <Outlet/>  
      </section>
      <Footer/>
      <ToastComponent/>
    </>
  )
}
