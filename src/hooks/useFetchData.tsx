import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData(): OpenMeteoResponse | null {   /* OJO CON ESTO */
  const URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=wind_speed_10m,temperature_2m,relative_humidity_2m,apparent_temperature&current=wind_speed_10m,temperature_2m,relative_humidity_2m,apparent_temperature&timezone=America%2FChicago';

  const [data, setData] = useState<OpenMeteoResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        const json: OpenMeteoResponse = await response.json();
        setData(json);
      } catch (error) {
        console.error('Error fetching Open-Meteo data:', error);
      }
    };

    void fetchData();
  }, []);

  return data;
}