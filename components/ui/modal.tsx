"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ModalProps {
    title:string,
    description:string,
    isOpen:boolean,
    onClose: ()=>void,
    children?: React.ReactNode
}


export const Modal: React.FC<ModalProps>=({
    title,
    description,
    isOpen,
    onClose,
    children
})=>{
    const onChange = (open:boolean)=>{
        if(!open){
            onClose();
        }
    };
    return <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className="max-w-2xl w-full">
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
            </DialogHeader>
            {/* Scrollable content area for overflow */}
            <div className="max-h-[70vh] overflow-y-auto">
                {children}
            </div>
        </DialogContent>
    </Dialog>
}