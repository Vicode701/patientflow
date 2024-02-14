import { IconRobot } from '@tabler/icons-react';
import { FC } from 'react';

interface Props { }

export const ChatLoader: FC<Props> = () => {
  return (
    <div
      className="group border-b border-black/10 bg-gray-50 text-gray-800"
      style={{ overflowWrap: 'anywhere' }}
    >
      <div className="m-auto flex gap-4 p-4 text-base md:max-w-2xl md:gap-6 md:py-6 lg:max-w-2xl lg:px-0 xl:max-w-3xl">
        <div className="min-w-[40px] items-end">
          <IconRobot size={30} />
        </div>
        <span>Hey Doc, hang tight while I generate your H&P, assessment and plan</span>
        <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-neutral-800 opacity-60"></div>
        {/* <span className="animate-pulse cursor-default mt-1">▍</span> */}
      </div>
    </div>
  );
};
