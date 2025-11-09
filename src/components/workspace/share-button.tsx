"use client";

import { Button } from '@/components/ui/button';
import { Share2Icon } from 'lucide-react'
import { useShareModal } from '@/store/workspace';

interface ShareButtonProps {
    workspace: string
}

const ShareButton = ({ workspace }: ShareButtonProps) => {
    const { setIsShare, setActiveWorkspace } = useShareModal();
    return (
        <Button onClick={() => {
            setIsShare()
            setActiveWorkspace(workspace);
        }} className="flex font-sans font-medium">
            <Share2Icon />
            <p>Share</p>
        </Button>
    )
}

export default ShareButton