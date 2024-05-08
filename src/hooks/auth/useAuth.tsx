import { getAuthUser } from "@/server/authAPI"
import { useQuery } from "@tanstack/react-query"

export default function useAuth() {

  const { data, isError, isLoading } = useQuery({
    queryKey:['user'],
    queryFn:getAuthUser,
    retry:false,
    refetchOnWindowFocus:false
  })
  return { data, isError, isLoading }
}
