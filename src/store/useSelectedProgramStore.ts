import { create } from 'zustand';

interface SelectProgramState {
	selectedProgramId: number | null;
	setSelectedProgramId: (id: number | null) => void;
}

const useSelectedProgramStore = create<SelectProgramState>((set) => ({
	selectedProgramId: null,
	setSelectedProgramId: (id) => set({ selectedProgramId: id }),
}));

export default useSelectedProgramStore;
