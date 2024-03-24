import { NavbarNested } from '@/components/Navbar/NavbarNested';
import { HeaderMegaMenu } from '@/components/HeaderMegaMenu/HeaderMegaMenu';
import ForecastChart from '../../components/ChartsComponent/ReChartsComponent';
import ForecastChart2 from '../../components/ChartsComponent/ReChartsComponent2';
import ForecastChart3 from '../../components/ChartsComponent/ReChartsComponent3';
import ForecastChart4 from '../../components/ChartsComponent/ReChartsComponent4';
import FiltersComponent from '../../components/FiltersContainer/FiltersContailer'
import Subgrid from '../../components/FiltersContainer/FiltersContainer2';
import { Group, Button } from '@mantine/core';

import ComponentView from '../../components/DataScienceComponentView/DataScienceComponentView'




// export default function DataSciencePage() {
//   return (
//     <>
//       <div style={{ display: 'flex', height: '100vh' }}>
//         <NavbarNested />
//         {/* <HeaderMegaMenu style={{ flex: 1 }} />
//           <GridView /> */}
//         <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
//           <HeaderMegaMenu />
//           <FiltersComponent/>
//           {/* <FiltersComponent /> */}
//           <div>
//             <h1>Data Forecasting Visualization</h1>
//             <ForecastChart />
//           </div>
//           <div>
//             <h1>Data Forecasting Visualization 2</h1>
//             <ForecastChart2 />
//           </div>
//           <div>
//             <h1>Data Forecasting Visualization 3</h1>
//             <ForecastChart3 />
//           </div>
//           <div>
//             <h1>Data Forecasting Visualization 4</h1>
//             <ForecastChart4 />
//           </div>
//         </div>


//       </div>
//     </>
//   );
// }




export default function DataSciencePage() {
  return (
    <>
      {/* <div style={{ display: 'flex', height: '100vh' }}>
        <NavbarNested />
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <HeaderMegaMenu />
          <Subgrid />
        </div>
      </div> */}
      <div style={{ display: 'flex', height: '100vh' }}>
        <NavbarNested />
        {/* <HeaderMegaMenu style={{ flex: 1 }} />
        <GridView /> */}
        <ComponentView />
      </div>
    </>
  );
}