import { useState, useEffect } from 'react';

/**
 * 1: 위치 정보 획득 거부
 * 2: 위치 정보 획득 불가능
 * 3: 위치 정보 획득 타임아웃
 */
export enum GEOLOCATION_ERROR_CODE {
  PERMISSION_DENIED = 1,
  POSITION_UNAVAILABLE = 2,
  TIMEOUT = 3,
}

export const useGeolocation = (maxRetries = 3, retryDelay = 3000) => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: loading state 구현
  const fetchLocation = () => {
    setIsLoading(true);
    if (!navigator.geolocation) {
      setError({ code: 0, message: 'Geolocation is not supported' } as GeolocationPositionError);
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation(pos);
        setError(null);
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        if (retryCount < maxRetries) {
          setTimeout(() => {
            setRetryCount((prev) => prev + 1);
            fetchLocation();
          }, retryDelay);
        } else {
          setIsLoading(false);
        }
      },
    );
  };

  useEffect(() => {
    fetchLocation();

    return () => {
      setIsLoading(false);
    };
  }, []);

  return { location, error, retry: fetchLocation, isLoading };
};
