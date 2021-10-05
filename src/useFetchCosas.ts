import { useCallback, useEffect, useState } from "react";

const COSAS = 40;

const getRandomString = () => Math.random().toString(36).split(".")[1];

const useFetchCosas = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cosas, setCosas] = useState<string[]>([]);

  const fetchCosas = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      const nextCosas = [...Array(COSAS)].map(() => getRandomString());
      setCosas((cosas) => [...cosas, ...nextCosas]);
      setIsLoading(false);
    }, 4000);
  }, []);

  useEffect(fetchCosas, [fetchCosas]);

  return { isLoading, fetchCosas, cosas };
};

export default useFetchCosas;
