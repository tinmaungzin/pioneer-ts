import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  storeSelectedEventId: number | undefined;
};
type Actions = {
  setStoreSelectedEventId: (storeSelectedEventId: number | undefined) => void;
};

const useSelectedEvent = create<Store & Actions>()(
  persist(
    (set) => ({
      storeSelectedEventId: undefined,
      setStoreSelectedEventId: (storeSelectedEventId) =>
        set(() => ({ storeSelectedEventId: storeSelectedEventId })),
    }),
    {
      name: "selected-event-id-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useSelectedEvent;
