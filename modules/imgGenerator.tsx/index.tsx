'use client';
import { useImgUrl } from '@/services/img';

//TODO: bad coding styles
const ImgGeneratorWrapper: React.FC = () => {
  const imgUrl = useImgUrl();
  if (!imgUrl)
    return (
      <div className="flex items-center justify-center w-full min-h-[256px]">
        generating image...
      </div>
    );
  return (
    <div className="flex items-center justify-center w-full">
      <ImgRenderer imgUrl={imgUrl} />
    </div>
  );
};

export default ImgGeneratorWrapper;

const ImgRenderer: React.FC<{ imgUrl: string }> = ({ imgUrl }) => {
  return (
    //TODO: change to use next/image
    <img
      src={imgUrl}
      alt="img"
      className="max-h-[400px] w-[256px] h-[256px] "
    />
  );
};
