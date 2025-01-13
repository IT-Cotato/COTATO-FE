import { useNavigate, useSearchParams } from 'react-router-dom';

//
//
//

type QueryParams = {
  [key: string]: string | string[] | null | undefined;
};

//
//
//

export const useAttendanceReportFilter = () => {
  const navigate = useNavigate();

  //
  const [searchParams] = useSearchParams();

  /**
   * update search params
   */
  const updateSearchParams = (value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (!value) {
      newParams.delete('search');
    } else {
      newParams.set('search', value);
    }

    applyQueryParams(newParams);
  };

  /***
   * add query string to url
   */
  const applyQueryParams = (params: URLSearchParams) => {
    navigate(`?${params.toString()}`);
  };

  /**
   * add query param to url
   * if already key exists, append value to key
   */
  const addQueryParams = (params: QueryParams) => {
    const queryParams = new URLSearchParams(location.search);

    Object.keys(params).forEach((key: string) => {
      const value = params[key];
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v));
      } else if (value) {
        queryParams.append(key, value);
      }
    });

    applyQueryParams(queryParams);
  };

  /**
   * delete query string from url
   * if key has multiple values, delete only one value
   */
  const deleteQueryParams = (key: string, deleteValue: string) => {
    const currentSearchParams = searchParams.getAll(key);

    const newParams = new URLSearchParams(searchParams.toString());
    const newValues = currentSearchParams.filter((value) => value !== deleteValue);

    newParams.delete(key);

    // if newValues is not empty, append new values
    if (newValues.length) {
      newValues.forEach((value) => newParams.append(key, value));
    }

    applyQueryParams(newParams);
  };

  /**
   *
   */
  const toggleStatus = (status: string) => {
    const currentStatus = searchParams.getAll('status');

    if (currentStatus?.includes(status)) {
      deleteQueryParams('status', status);
      return;
    }

    addQueryParams({ status: status });
  };

  return {
    currentStatus: searchParams.getAll('status'),
    toggleStatus,
    updateSearchParams,
  };
};
