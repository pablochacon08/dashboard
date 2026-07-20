import { useState } from 'react';
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import IndicatorUI from './components/IndicatorUI';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import useFetchData from './hooks/useFetchData';
import './App.css'

function App() {
  // Estado para la ciudad seleccionada
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Comunica la opción seleccionada al hook personalizado
  const { data, loading, error } = useFetchData(selectedOption);

  return (
        <Grid container spacing={5} sx={{ justifyContent: "left", alignItems: "center" }}>

         {/* Encabezado */}
         <Grid size={{ xs: 12, md: 12 }}><HeaderUI/></Grid>

         {/* Alertas */}
         <Grid size={12} container sx={{ justifyContent: "right", alignItems: "center" }}><AlertUI description="No se preveen lluvias"/></Grid>

         {/* Selector */}
         <Grid size={{ xs: 12, md: 3  }}><SelectorUI onOptionSelect={setSelectedOption} /></Grid>

         {/* Indicadores */}
         <Grid size={{ xs: 12, md: 9 }} container spacing={2}>
           <Grid size={{ xs: 12, md: 3 }}>
             {data && (
               <IndicatorUI
                 title='Temperatura (2m)'
                 description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`}
               />
             )}
           </Grid>

           <Grid size={{ xs: 12, md: 3 }}>
             {data && (
               <IndicatorUI
                 title='Temperatura aparente'
                 description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`}
               />
             )}
           </Grid>

           <Grid size={{ xs: 12, md: 3 }}>
             {data && (
               <IndicatorUI
                 title='Velocidad del viento'
                 description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`}
               />
             )}
           </Grid>

           <Grid size={{ xs: 12, md: 3 }}>
             {data && (
               <IndicatorUI
                 title='Humedad relativa'
                 description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`}
               />
             )}
           </Grid>
         </Grid>

         {/* Gráfico */}
         <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block"} }} >
           <ChartUI data={data} loading={loading} error={error} />
         </Grid>

         {/* Tabla */}
         <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
           <TableUI data={data} loading={loading} error={error} />
         </Grid>

         {/* Información adicional */}
         <Grid size={{ xs: 12, md: 12 }}>Elemento: Información adicional</Grid>

      </Grid>
    );
}

export default App;
