import { create } from 'zustand';

const useAvatarState = create((set, get, store) => ({
    reset: () => {
        set(store.getInitialState())
    },
    avatarUri: null,
    firstInitial: null,
    lastInitial: null,
    setAvatarUri: (newUri: string) => set(() => ({ avatarUri: newUri })),
    setFirstInitial: (initial: string) => set(() => ({ firstInitial: initial })),
    setLastInitial: (initial: string) => set(() => ({ lastInitial: initial }))
}));

export { useAvatarState };