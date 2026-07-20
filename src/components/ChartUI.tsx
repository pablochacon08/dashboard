import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { CircularProgress, Box } from '@mui/material';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface ChartUIProps {
   data: OpenMeteoResponse | null;
   loading: boolean;
   error: string | null;
}

function processChartData(data: OpenMeteoResponse) {
   const hours = Math.min(24, data.hourly.time.length);
   const times = data.hourly.time.slice(0, hours).map(time => {
      const date = new Date(time);
      return date.toLocaleString('sv-SE', {
         year: 'numeric',
         month: '2-digit',
         day: '2-digit',
         hour: '2-digit',
         minute: '2-digit',
      });
   });
   const temperatures = data.hourly.temperature_2m.slice(0, hours);
   const windSpeeds = data.hourly.wind_speed_10m.slice(0, hours);
   const humidity = data.hourly.relative_humidity_2m.slice(0, hours);
   
   return { times, temperatures, windSpeeds, humidity };
}

export default function ChartUI({ data, loading, error }: ChartUIProps) {
   if (loading) {
      return (
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <CircularProgress />
         </Box>
      );
   }

   if (error) {
      return (
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <Alert severity="error">{error}</Alert>
         </Box>
      );
   }

   if (!data) {
      return (
         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <Alert severity="info">No hay datos disponibles.</Alert>
         </Box>
      );
   }

   const { times, temperatures, windSpeeds, humidity } = processChartData(data);

   return (
      <>
         <Typography variant="h5" component="div">
            Pronóstico: Temperatura, Viento y Humedad (24h)
         </Typography>
         <LineChart
            height={350}
            series={[
               { data: temperatures, label: 'Temperatura (°C)' },
               { data: windSpeeds, label: 'Viento (km/h)' },
               { data: humidity, label: 'Humedad (%)' },
            ]}
            xAxis={[{ scaleType: 'point', data: times }]}
            margin={{ bottom: 40, left: 50, right: 10, top: 20 }}
         />
      </>
   );
}