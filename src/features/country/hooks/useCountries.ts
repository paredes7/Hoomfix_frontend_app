import { useEffect, useState } from 'react';
import { getCountriesApi, type Country } from '../api/country.api';

export function useCountries() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCountriesApi()
      .then(setCountries)
      .catch(() => setCountries([]))
      .finally(() => setLoading(false));
  }, []);

  return { countries, loading };
}
