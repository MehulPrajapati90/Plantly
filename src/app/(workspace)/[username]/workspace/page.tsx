import WorkspaceWrapper from "@/components/workspace/workspace-wrapper";

interface WorkspaceProps {
  params: Promise<{
    username: string
  }>
}

const Workspace = async ({ params }: WorkspaceProps) => {
  const { username } = await params;

  return (
    <div className="w-full flex items-center justify-center gap-5">
      <WorkspaceWrapper username={username} />
    </div>
  )
}

export default Workspace;