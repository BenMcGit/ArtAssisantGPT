import { create } from 'zustand';

interface MessageStore {
  message: string;
  setMessage: (message: string) => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  message: '',
  setMessage: (message: string) => set({ message }),
}));

const selectors = {
  getMessage: (state: MessageStore) => state.message,
  setMessage: (state: MessageStore) => state.setMessage,
};

export const useMessage = () => useMessageStore(selectors.getMessage);
export const useSetMessage = () => useMessageStore(selectors.setMessage);
