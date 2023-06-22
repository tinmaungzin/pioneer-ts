import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type User = {
  name: string | undefined;
  phone_number: string | undefined;
  id: number | undefined;
};
type Store = {
  registerUser: User;
};
type Actions = {
  setRegisterUser: (registerUser: User) => void;
};

const useRegisterUser = create<Store & Actions>()(
  persist(
    (set) => ({
      registerUser: {
        name: undefined,
        phone_number: undefined,
        id: undefined,
      },
      setRegisterUser: (registerUser) =>
        set(() => ({ registerUser: registerUser })),
    }),
    {
      name: "register-user",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export default useRegisterUser;
