'use client';

import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Navbar } from '@/components/Navbar/Navbar';
// import { NavbarNested } from '@/components/Navbar/NavbarNested';
// import { HeaderMegaMenu } from "@/components/HeaderMegaMenu/HeaderMegaMenu";
import { DatasetGridView } from '@/components/DatasetGrid/DataSetGrid';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

interface pageProps {
  params: { id: string }
}

export default /*async*/ function DatasetsPage({ params }: { params:pageProps }) {
  const { id } = params;

  if (id === null) {
    // Handle invalid id case here
    return <div>Invalid dataset ID</div>;
  }

    return (
        <>
        <ErrorBoundary>
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar />
            {/* <HeaderMegaMenu style={{ flex: 1 }} />
            <GridView /> */}
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <Navbar />
              <DatasetGridView datasetId={id} style={{ width: '100%' }} />
            </div>
        </div>
        </ErrorBoundary>

        </>
      );
}
