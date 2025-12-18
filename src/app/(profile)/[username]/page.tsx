import { getUserByUsernameforPreview } from "@/actions/workspace";
import ProfileWrapper from "@/components/profile/profile-wrapper";
import { Spinner } from "@/components/ui/spinner";

interface ProfileProps {
    params: Promise<{
        username: string
    }>
}

const Profile = async ({ params }: ProfileProps) => {
    const { username } = await params;
    const { workspacedata, success, error } = await getUserByUsernameforPreview(username);

    if (!workspacedata) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <Spinner />
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            <ProfileWrapper workspacedata={workspacedata} workspace={username} />
        </div>
    )
}

export default Profile;