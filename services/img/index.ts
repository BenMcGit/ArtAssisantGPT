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
    let res = JSON.stringify(
      await fetchApi({
        path: '/img',
        method: 'POST',
        params: { prompt: prompt },
      })
    );
    let url = JSON.parse(res).data[0].url;
    set({ url });
  },
  clearImg: () => {
    set({ url: '' });
  },
}));

const selectors = {
  getUrl: (state: ImageStore) => state.url,
  requestImg: (state: ImageStore) => state.requestImg,
  clearImg: (state: ImageStore) => state.clearImg,
};

export const useImgUrl = () => useImageStore(selectors.getUrl);
export const useRequestImg = () => useImageStore(selectors.requestImg);
export const useClearImg = () => useImageStore(selectors.clearImg);
