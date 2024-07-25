import { SessionListImageInfo } from '@/typing/session';

/**
 * Sort image list by order
 * @param imageList
 */
const imageSortByOrder = (imageList: SessionListImageInfo[]): SessionListImageInfo[] => {
  imageList.sort((left, right) => {
    if (left.order && right.order) {
      return left.order - right.order;
    }

    return 0;
  });
  return imageList;
};

export default imageSortByOrder;
