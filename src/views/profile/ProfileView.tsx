import ProfileForm from "@/components/form/profile/ProfileForm";
import useAuth from "@/hooks/auth/useAuth"

export default function ProfileView() {

  const { data: profile, isLoading } = useAuth();

  if(isLoading) return <p>Loading...</p>
  if(profile)return(
    <ProfileForm data={profile}/>
  )
}
