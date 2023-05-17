import {create} from 'zustand';

interface questionsModal {
    isOpen:boolean;
    onOpen:()=>void;
    onClose:()=>void
}

const useQuestionsModal = create<questionsModal>((set)=>({
    isOpen:false,
    onOpen:()=>set({isOpen:true}),
    onClose:()=>set({isOpen:false})
}))

export default useQuestionsModal;