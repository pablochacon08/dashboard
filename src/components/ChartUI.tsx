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
   // Tomar los primeros 24 registros (24 horas)
   const hours = Math.min(24, data.hourly.time.length);
   const times = data.hourly.time.slice(0, hours).map(time => {
      const date = new Date(time);
      return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
   });
   const temperatures = data.hourly.temperature_2m.slice(0, hours);
   const windSpeeds = data.hourly.wind_speed_10m.slice(0, hours);
   
   return { times, temperatures, windSpeeds };
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

   const { times, temperatures, windSpeeds } = processChartData(data);

   return (
      <>
         <Typography variant="h5" component="div">
            Pronóstico: Temperatura y Velocidad del Viento (24h)
         </Typography>
         <LineChart
            height={300}
            series={[
               { data: temperatures, label: 'Temperatura (°C)' },
               { data: windSpeeds, label: 'Viento (km/h)' },
            ]}
            xAxis={[{ scaleType: 'point', data: times }]}
            margin={{ bottom: 30, left: 40, right: 10, top: 10 }}
         />
      </>
   );
}