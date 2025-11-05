interface ProfileProps {
    params: Promise<{
        username: string
    }>
}

const Profile = async ({ params }: ProfileProps) => {
    const { username } = await params;
    return (
        <div>
            {username}
        </div>
    )
}

export default Profile;