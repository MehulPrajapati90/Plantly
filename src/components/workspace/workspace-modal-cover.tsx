"use client";

import { useWorkspaceModel } from '@/store/workspace';
import { Button } from '../ui/button'
import { Plus } from 'lucide-react';

const WorkspaceModalCover = () => {
    const { setIsWorkspace } = useWorkspaceModel();
    return (
        <Button variant={"outline"} onClick={setIsWorkspace}>
            <Plus />
        </Button>
    )
}

export default WorkspaceModalCover