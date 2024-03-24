'use client';

import { useEffect, useState } from 'react';
import { SimpleGrid, useMantineTheme, Modal, Button, Overlay, Checkbox, Alert, Portal, LoadingOverlay } from '@mantine/core';
import Image from 'next/image';
import { useMediaQuery } from '@mantine/hooks';
import DatasetInfoTable from '../DatasetInfoTable/DatasetInfoTable';
import Error from '../../app/datasets/error';
//import GraphTable from '../GraphTable/GraphTable';

const customBreakpoints = {
  sm: 768, // example value for small screens
};

//eslint-disable-next-line max-len
export function DatasetGridView({ datasetId, style }: { datasetId:number, style?: React.CSSProperties }) {
    const theme = useMantineTheme();
    const [datasetInfo, setDatasetInfo] = useState<string[][]>([]);
    const [showAlert, setShowAlert] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    const isSmallScreen = useMediaQuery(`(max-width: ${customBreakpoints.sm}px)`);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const ITEMS_PER_PAGE = 30; // Set your items per page here
    const [columnHeaders, setColumnHeaders] = useState([]);
    const [dataIntegrity, setDataIntegrity] = useState({});
    const [unitCol, setUnitCol] = useState<string>('');
    const [dateCol, setDateCol] = useState<string>('');


    //Cleaning Options

    const [removeNullValues, setRemoveNullValues] = useState(false);
    const [removeDuplicates, setRemoveDuplicates] = useState(false);

    //Modal
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    useEffect(() => {
      const fetchData = async () => {
          setLoading(true);
          setError(null);
          try {
            //For heroku replace with: https://dsa-backend-1ca76fb6bbb8.herokuapp.com/datalake/get_dataset_details/?dataset_id=${datasetId}&page=${currentPage}&page_size=${ITEMS_PER_PAGE}
            //For localhost replace with: http://localhost:8000/datalake/get_dataset_details/?dataset_id=${datasetId}&page=${currentPage}&page_size=${ITEMS_PER_PAGE}
            const response = await fetch(`http://localhost:8000/datalake/get_dataset_details/?dataset_id=${datasetId}&page=${currentPage}&page_size=${ITEMS_PER_PAGE}`);
            const data = await response.json();
              setDatasetInfo(data.data || []);
              setTotalItems(data.total_items);
              setColumnHeaders(data.columns || []);
              console.log(datasetId);

              let integrityUrl = `http://localhost:8000/datalake/analyze_csv/?csv_file_name=${datasetId}`;
              if (datasetId.endsWith('.parquet')) {
                  integrityUrl = `http://localhost:8000/datalake/analyze_parquet/?parquet_file_name=${datasetId}`;
              }

              const integrityResponse = await fetch(integrityUrl, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              const integrityData = await integrityResponse.json();

              setDataIntegrity(integrityData);

              const markedColumnsResponse = await fetch(`http://localhost:8000/datalake/get_unit_and_date_column/?dataset_id=${datasetId}`);

              const markedColsData = await markedColumnsResponse.json();
              if (markedColsData.data) {
                setUnitCol(markedColsData.data.unit_column);
                setDateCol(markedColsData.data.date_column);
              }
          } catch (e) {
              setError(e.toString()); // e has type any
          } finally {
              setLoading(false);
          }
      };
      if (datasetId) {
          fetchData();
      }
  }, [datasetId, currentPage]);

  useEffect(() => {
    console.log(dataIntegrity);
    console.log(totalItems);
}, [dataIntegrity, totalItems]);

    const handleCleanDatasetClick = () => {
      if (!datasetId) {
          setShowAlert(true);
          // Start fading out the alert after 2.5 seconds
          setTimeout(() => {
              setShowAlert(false);
          }, 2500);
          return;
      }
      openModal();
  };

  const handleApplyClick = async () => {
    // Gather selected options
    const options = [];
    if (removeDuplicates) options.push('remove_duplicates');
    if (removeNullValues) options.push('remove_nulls');

    try {
        setLoading(true);

        const queryParams = new URLSearchParams({
          file_name: datasetId,
          options: options.join(','), // Assuming 'options' is an array of strings
          columns_to_clean: '', // Since it's null in your request
          clean_entire_df: true,
      }).toString();

        //For heroku replace with: https://dsa-backend-1ca76fb6bbb8.herokuapp.com/clean/options
        //For localhost replace with: http://localhost:8000/clean/options
        const response = await fetch(`http://localhost:8000/datalake/clean/options?${queryParams}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          // No need for 'body' as the parameters are sent in the URL
      });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`); /* Error needs a status code */
        }

        const data = await response.json();
        console.log(data); // Or handle the response as needed
    } catch (e) {
        console.error('Error:', e);
    } finally {
        setLoading(false);
        closeModal();
    }
};
   //Dataset Table

    const buttonBaseStyle = {
        height: '75px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderRadius: '10px',
        border: '1px solid var(--neutral-700, #D1D9E2)',
        padding: '16px 20px', // Padding to give space between icon box and edges
        cursor: 'pointer',
        flex: '1 0 0',
        gap: '24px',
    };

    const iconBoxStyle = {
        width: '40px', // Adjust as needed
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '0px', // Space between icon box and text
        borderRadius: '25%',
    };

    const styles = {
        cleanDataset: {
            ...buttonBaseStyle,
            color: '#437EF7',
        },
        mergeDataset: {
            ...buttonBaseStyle,
            color: '#F78F43',
        },
        aiChat: {
            ...buttonBaseStyle,
            color: '#52C93F',
        },
    };

    const buttonTextStyle = {
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 'normal',
};

const buttonData = [
  {
      style: 'cleanDataset',
      onClick: handleCleanDatasetClick,
      iconSrc: '/clean_data_icon.svg',
      iconAlt: 'Clean Data',
      iconBackgroundColor: '#437EF7',
      text: 'Clean Dataset',
  },
  {
      style: 'mergeDataset',
      onClick: () => {}, // Replace with actual function
      iconSrc: '/merge_dataset_icon.svg',
      iconAlt: 'Merge Dataset',
      iconBackgroundColor: '#F78F43',
      text: 'Merge Dataset',
  },
  {
      style: 'aiChat',
      onClick: () => {}, // Replace with actual function
      iconSrc: '/ai_chat_bot_icon.svg',
      iconAlt: 'Meta Insights',
      iconBackgroundColor: '#52C93F',
      text: 'Show Meta Insights',
  },
];

if (error) return <Error statusCode={500} message={error} />;
if (isLoading) return <LoadingOverlay visible />;

  return (
    <>

<div>
    {error && <Error statusCode={500} message={error} />} {/* Display error message if there is an error*/}
    {isLoading && <LoadingOverlay visible />} {/*Display loading overlay while fetching*/}

    {datasetId !== null && (
           <div>
    <SimpleGrid
      cols={isSmallScreen ? 1 : 3} // 1 column for small screens, 3 for larger
      spacing="md"
      verticalSpacing="sm"
      style={{ paddingLeft: '40px', paddingRight: '20px', marginBottom: '40px', ...style }}
    >

  {buttonData.map((button, index) => (
    // eslint-disable-next-line
    <div key={index} style={ styles[button.style] } onClick={button.onClick}> {/* Element has type any*/}
      <div style={{ ...iconBoxStyle, backgroundColor: button.iconBackgroundColor }}>
        <Image src={button.iconSrc} alt={button.iconAlt} width={24} height={24} />
      </div>
        <span style={buttonTextStyle}>{button.text}</span>
    </div>
  ))}
    </SimpleGrid>
      {dataIntegrity && totalItems > 0 && (
          <DatasetInfoTable
            dataIntegrity={dataIntegrity}
            datasetInfo={datasetInfo}
            totalItems={totalItems}
            columnHeaders={columnHeaders}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
            unitColumn={unitCol}
            dateColumn={dateCol}
          />
      )}
  {/*<GraphTable/>*/}

           </div>
    )}
    {!datasetId && !isLoading && !error && (
      // If there are no datasets, display a placeholder or message
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <p style={{ color: theme.colors.gray[5], marginBottom: '20px' }}>
        Looks like this dataset is empty.
      </p>
      </div>
    )}
</div>

<Modal
  opened={isModalOpen}
  onClose={closeModal}
  title="Clean Dataset Options"
  size="md"
  padding="md"
  styles={{ title: { fontWeight: 'bold' } }}
>
            <div style={{ textAlign: 'right', marginTop: '20px' }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span>Standarise date columns</span>
                <Checkbox color="blue" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span>Remove unexpected null values</span>
                <Checkbox
                  color="blue"
                  checked={removeNullValues}
                  onChange={(event) => setRemoveNullValues(event.currentTarget.checked)}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span>Remove duplicates</span>
                <Checkbox
                  color="blue"
                  checked={removeDuplicates}
                  onChange={(event) => setRemoveDuplicates(event.currentTarget.checked)}
                />
            </div>

                <Button onClick={handleApplyClick} style={{ width: '100%', borderRadius: '5%' }}>
                    Apply
                </Button>
            </div>
</Modal>

          {isModalOpen && (
            <Overlay color={theme.colors.gray[7]} opacity={0.8} zIndex={100} />
          )}

          {showAlert && (
            <Portal>
              <div style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
                <Alert
                  color="red"
                  onClose={() => setShowAlert(false)}
                  style={!showAlert ? { transition: 'opacity 0.5s', opacity: 0 } : {}}
                >
                  No dataset selected
                </Alert>
              </div>
            </Portal>
          )}
    </>
      );
}
