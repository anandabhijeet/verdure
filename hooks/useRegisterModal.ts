import {create} from 'zustand';

interface registerModal {
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void
}

const useRegisterModal = create<registerModal>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default useRegisterModal;