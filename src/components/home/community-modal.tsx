"use client";

import { useCommunityModal } from "@/store/auth";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUpdateCommunity } from "@/hooks/community";
import { toast } from "sonner";
import { useState } from "react";


const CommunityModal = () => {
    const router = useRouter();
    const { mutateAsync, isPending } = useUpdateCommunity();
    const { isCommunityOpen, setIsCommunityOpen } = useCommunityModal();
    const [checked, setChecked] = useState<boolean>(false);

    const handleCloseForm = () => {
        setIsCommunityOpen();
    }

    const handleCommunityUpdate = async () => {
        const res = await mutateAsync();

        if (res.success) {
            toast.success(res.message);

            router.push('/community');
        } else {
            toast.error(res.error);
        }

        setIsCommunityOpen();
    }

    return (
        <Dialog open={isCommunityOpen} onOpenChange={handleCloseForm}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>WellCome to Community</DialogTitle>

                    <DialogDescription className='text-[12.5px] leading-3'>
                        proceed to enter into the community!
                    </DialogDescription>
                </DialogHeader>

                <div className='flex flex-col justify-start items-center gap-3 min-h-auto pt-2'>
                    <div className="min-h-auto w-full bg-zinc-900 text-[12px] font-sans font-normal tracking-[-0.1px] p-6 text-zinc-400 rounded-[8px]">
                        We value your privacy and are committed to protecting your personal information. Any data you share within this community may be visible to other members, so please post thoughtfully. While we strive to maintain a safe and respectful environment, we are not responsible for user-generated content or any interactions that occur outside the platform. By using this app, you agree to our community guidelines and acknowledge that you use the service at your own discretion.
                    </div>
                    <div className="flex justify-start items-center min-h-auto w-full gap-[5px] px-4">
                        <Input
                            id="check"
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                            className="accent-blue-500 size-3"
                        />
                        <Label htmlFor="check" className="font-sans font-normal text-[12px] text-[#f3f3f3]">click to continue</Label>
                    </div>
                </div>

                <DialogFooter className="relative w-full flex items-center justify-center px-2">
                    {isPending && (<LoaderCircle size={20} className="absolute left-4 text-[#f3f3f3] animate-spin" />)}
                    <div className="flex gap-2">
                        <Button onClick={handleCloseForm} variant={"secondary"}>Cancel</Button>
                        <Button disabled={isPending || !checked} onClick={handleCommunityUpdate}>Submit</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CommunityModal;