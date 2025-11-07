import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ShareButton from "@/components/workspace/share-button";
import ShareModal from "@/components/workspace/share-modal";
import WorkspaceDropDownBg from "@/components/workspace/workspace-dropdown-bg";
import WorkSpaceModal from "@/components/workspace/workspace-modal";
import WorkspaceModalCover from "@/components/workspace/workspace-modal-cover";
import WorkspaceProfile from "@/components/workspace/workspace-profile";
import { ChartBarBig, Pen } from "lucide-react";

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
          <ShareButton workspace={username} />
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
      <div className="w-full min-h-auto pt-15 px-5">
        <div className="px-5">
          <h1 className="text-3xl font-sans font-medium tracking-[-0.5px]">Profile</h1>
          <p className="text-[13px] font-sans font-medium">Here, your profile and can make changes!</p>
        </div>

        <div className="flex justify-center items-center gap-5 pt-5">
          <div className="w-full md:w-[50%] min-h-auto bg-zinc-900 rounded-[100px] border border-dashed border-zinc-500">
            <WorkspaceProfile workspace={username} />
          </div>
          <div className="h-10 hidden md:flex">
            <Separator orientation="vertical" />
          </div>
          <div className="w-[50%] min-h-auto bg-zinc-900 hidden md:flex">
            {/* <WorkspaceProfile workspace={username} /> */}
          </div>
        </div>
      </div>
      <WorkSpaceModal />
      <ShareModal />
    </div>
  )
}

export default Workspace