import { SessionListImageInfo } from '@/typing/session';

/**
 * Sort image list by order
 * @param imageList
 * @return sorted image list
 */
const imageSortByOrder = (imageList: SessionListImageInfo[]): SessionListImageInfo[] => {
  const newImageList = [...imageList];

  newImageList.sort((left, right) => {
    if (left.order !== undefined && right.order !== undefined) {
      return left.order - right.order;
    }

    return 0;
  });

  return newImageList;
};

export default imageSortByOrder;
