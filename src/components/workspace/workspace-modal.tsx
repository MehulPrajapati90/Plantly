"use client";

import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useWorkspaceModel } from '@/store/workspace';
import { useCheckUsername, useClaimUsername } from '@/hooks/workspace';
import { CheckCheck, LoaderCircle, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';

const WorkSpaceModal = () => {
    const { mutateAsync, isPending } = useCheckUsername();
    const { mutateAsync: claimAsync, isPending: isLoading } = useClaimUsername();
    const { setIsWorkspace, isWorkspace } = useWorkspaceModel();
    const [username, setUsername] = useState<string>("");
    const [suggestion, setSuggestion] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    const handleCloseForm = () => {
        setIsWorkspace();
    }

    const handleCheckUsername = async () => {
        const res = await mutateAsync(username.trim());

        console.log(res)

        if (res.success && res?.suggestion?.length! > 0) {
            setSuggestion(res?.suggestion!)
        } else if (res.success && res?.suggestion?.length === 0) {
            // setAvailable(true);
        } else {
            setError(res?.error!);
        }
    }

    const handleClaimUsername = async () => {
        const res = await claimAsync(username);

        if (res.success) {
            toast.success(res.message);
        } else {
            toast.error(res.error);
        }

        handleCloseForm();
    }

    useEffect(() => {
        if (!username.trim()) {
            setSuggestion([]);
            return;
        }
        handleCheckUsername();
    }, [username])
    return (
        <Dialog open={isWorkspace} onOpenChange={handleCloseForm}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Create new Workspace</DialogTitle>

                    <DialogDescription className='text-[12.5px] leading-3'>
                        proceed and enter a unique identifier!
                    </DialogDescription>
                </DialogHeader>

                <div className='flex flex-col justify-start items-center gap-3 min-h-auto pt-2'>
                    <div className="flex flex-col justify-center items-start min-h-auto w-full gap-[5px]">
                        <Label htmlFor="username" className="font-sans font-normal text-[12px] text-[#f3f3f3]">Workspace name</Label>
                        <Input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="accent-blue-500"
                        />
                    </div>
                </div>
                {suggestion.length > 0 && (
                    <div className='flex justify-start items-center px-2'>
                        <p className='text-[13px] text-red-500 font-medium pr-5'>Suggestions</p>
                        <Separator orientation='vertical' />
                        {suggestion.map((item) => (
                            <Button key={item} onClick={() => setUsername(item)} variant={"link"} className='text-[13px] text-zinc-400 font-normal'>{item}</Button>
                        ))}
                    </div>
                )}

                <DialogFooter className="relative w-full flex items-center justify-center px-1">
                    {(isPending || isLoading) && (<LoaderCircle size={20} className="absolute left-4 text-[#f3f3f3] animate-spin" />)}

                    {!isPending && !isLoading && username && suggestion.length > 0 && (<X className='absolute left-4 text-red-500' />)}

                    {!isPending && !isLoading && username && suggestion.length === 0 && (<CheckCheck className='absolute left-4 text-green-500' />)}

                    <div className="flex gap-2">
                        <Button onClick={handleCloseForm} variant={"secondary"}>Cancel</Button>
                        <Button disabled={isPending || isLoading || !username || suggestion.length > 0} onClick={handleClaimUsername}>Submit</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default WorkSpaceModal;