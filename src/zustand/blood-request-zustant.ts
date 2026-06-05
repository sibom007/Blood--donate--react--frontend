import { create } from "zustand";

interface BloodRequestState {
  selectedDonorId: string | undefined;
  selectedInventoryId: string | undefined;
  selectDonor: (id: string) => void;
  selectInventory: (id: string) => void;
  clearSelections: () => void;
}

export const useBloodRequestStore = create<BloodRequestState>((set) => ({
  selectedDonorId: undefined,
  selectedInventoryId: undefined,

  selectDonor: (id) =>
    set((state) => ({
      // If clicked again, deselect it. Otherwise select it and clear inventory.
      selectedDonorId: state.selectedDonorId === id ? undefined : id,
      selectedInventoryId: undefined,
    })),

  selectInventory: (id) =>
    set((state) => ({
      // If clicked again, deselect it. Otherwise select it and clear donor.
      selectedInventoryId: state.selectedInventoryId === id ? undefined : id,
      selectedDonorId: undefined,
    })),

  clearSelections: () =>
    set({ selectedDonorId: undefined, selectedInventoryId: undefined }),
}));
