import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Navbar } from '@/components/Navbar/Navbar';
import { GridView } from '../components/Grid/Grid';

export default function HomePage() {
  return (
    <>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Navbar />
          <GridView style={{ width: '100%' }} />
        </div>

      </div>
    </>
  );
}
