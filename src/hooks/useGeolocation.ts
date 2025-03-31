import { useState, useEffect } from 'react';

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
