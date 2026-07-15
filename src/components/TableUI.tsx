import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

interface TableUIProps {
   data: OpenMeteoResponse | null;
}

function processHourlyData(data: OpenMeteoResponse) {
   // Tomar los primeros 24 registros (24 horas)
   const hours = Math.min(24, data.hourly.time.length);
   return data.hourly.time.slice(0, hours).map((time, index) => ({
      id: index,
      time: new Date(time).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      temperature: data.hourly.temperature_2m[index],
      windSpeed: data.hourly.wind_speed_10m[index],
      humidity: data.hourly.relative_humidity_2m[index],
   }));
}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 60 },
   {
      field: 'time',
      headerName: 'Hora',
      width: 110,
   },
   {
      field: 'temperature',
      headerName: 'Temperatura (°C)',
      width: 150,
      valueFormatter: (value: number | null) => value ? value.toFixed(1) : '-',
   },
   {
      field: 'windSpeed',
      headerName: 'Viento (km/h)',
      width: 150,
      valueFormatter: (value: number | null) => value ? value.toFixed(1) : '-',
   },
   {
      field: 'humidity',
      headerName: 'Humedad (%)',
      width: 130,
      valueFormatter: (value) => value ? `${value}%` : '-',
   },
];

export default function TableUI({ data }: TableUIProps) {
   if (!data) {
      return (
         <Box sx={{ height: 350, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
         </Box>
      );
   }

   const rows = processHourlyData(data);

   return (
      <Box sx={{ height: 350, width: '100%' }}>
         <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
         />
      </Box>
   );
}