import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import WorkspaceDropDownBg from "@/components/workspace/workspace-dropdown-bg";
import WorkSpaceModal from "@/components/workspace/workspace-modal";
import WorkspaceModalCover from "@/components/workspace/workspace-modal-cover";
import { ChartBarBig, Pen, Share2Icon } from "lucide-react";

interface WorkspaceProps {
  params: Promise<{
    username: string
  }>
}

const Workspace = async ({ params }: WorkspaceProps) => {
  const { username } = await params;
  return (
    <div className="w-full min-h-auto flex flex-col justify-center items-center">
      <div className="w-full min-h-auto flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant={"outline"} className="flex text-[#e9e9e9] font-sans font-medium">
            <Pen />
            <p>Design</p>
          </Button>
          <Button className="flex font-sans font-medium">
            <Share2Icon />
            <p>Share</p>
          </Button>
          <WorkspaceModalCover />
        </div>
        <div className="bg-zinc-950 rounded-[6px] px-5 py-2 flex justify-center items-center gap-2 h-14">
          <div className="flex gap-1 justify-center items-center">
            <p className="text-[#f3f3f3] font-sans font-medium text-[12px]">Workspaces</p>
            <ChartBarBig size={13} />
          </div>
          <Separator orientation="vertical" className="h-6" />
          <WorkspaceDropDownBg active={username} />
        </div>
      </div>
      <div>
        {username}
      </div>
      <WorkSpaceModal />
    </div>
  )
}

export default Workspace