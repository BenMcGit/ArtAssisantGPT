import { create } from 'zustand';
import { fetchApi } from '@/utils/fetch';
import { useMessageStore } from '../message';

interface ImageStore {
  url: string;
  requestImg: () => void;
  clearImg: () => void;
}

const useImageStore = create<ImageStore>((set) => ({
  url: '',
  requestImg: async () => {
    let prompt = useMessageStore.getState().message;
    //TODO:send request to server
    let url = await fetchApi<string>({
      path: '/api/image',
      method: 'POST',
      params: { prompt },
    });
    debugger;
    set({ url });
  },
  clearImg: () => set({ url: '' }),
}));

const selectors = {
  getUrl: (state: ImageStore) => state.url,
  requestImg: (state: ImageStore) => state.requestImg,
  clearImg: (state: ImageStore) => state.clearImg,
};

export const useImgUrl = () => useImageStore(selectors.getUrl);
export const useRequestImg = () => useImageStore(selectors.requestImg);
export const useClearImg = () => useImageStore(selectors.clearImg);
