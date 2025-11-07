import React from 'react'


interface WorkspaceProps {
    params: Promise<{
        username: string
    }>
}

const OverView = async ({ params }: WorkspaceProps) => {
    const { username } = await params;
    return (
        <div>{username}</div>
    )
}

export default OverView