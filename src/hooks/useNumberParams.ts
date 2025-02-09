import { useParams } from 'react-router-dom';

/**
 * only use for get params from url with number type
 * if not exists, return undefined
 * if not number, return NaN
 */
export const useNumberParams = () => {
  const params = useParams();

  //
  const numberParams = Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      const parsedValue = Number(value);
      return [key, parsedValue];
    }),
  );

  return numberParams;
};
