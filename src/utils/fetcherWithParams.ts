import api from '@/api/api';

const fetcherWithParams = (url: string, queryParams: any) =>
  api
    .get(url, {
      params: queryParams,
    })
    .then((res) => res.data);

export default fetcherWithParams;
