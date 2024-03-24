'use client';

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Text, Group, Button, rem, useMantineTheme, Alert, Loader, Select, Title } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload, IconInfoCircle } from '@tabler/icons-react';
import classes from './DropzoneButton.module.css';

export function DropzoneButton() {
  const router = useRouter();
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayMode, setDisplayMode] = useState('dropzone');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const icon = <IconInfoCircle />;
  const [columns, setColumns] = useState([]);
  const [unitColumn, setUnitColumn] = useState('');
  const [dateColumn, setDateColumn] = useState('');
 
  useEffect(() => {
    console.log(columns);
}, [columns]);

  const fetchDatasetDetails = async (fileName: String) => {
    //Heroku link: https://dsa-backend-1ca76fb6bbb8.herokuapp.com/datalake/get_dataset_details?dataset_id=${fileName}&page=1&page_size=14
    const url = `http://localhost:8000/datalake/get_dataset_details?dataset_id=${fileName}&page=1&page_size=14`;
    try {
      const response = await fetch(url, { method: 'GET' });
      const data = await response.json();
      console.log(data)
      if (data.columns) {
        setColumns(data.columns);
      }
    } catch (error) {
      console.error('Error fetching dataset details:', error);
    }
  };

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    setUploadedFileName(file.name);
    try {
      //Heroku link: https://dsa-backend-1ca76fb6bbb8.herokuapp.com/blob storage/upload_csv/
      const response = await fetch('http://localhost:8000/datalake/raw/upload_file/', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        console.error('Response Error:', response); // Log the entire response
        throw new Error(`HTTP error! Status: ${response.status}, Status Text: ${response.statusText}`);
      }
      const data = await response.json();

      setAlertMessage(`Upload successful: ${data.message}`);
      fetchDatasetDetails(file.name);
      setIsLoading(false);
      console.log(columns);
        if (!isLoading) {
          setDisplayMode('content');
        }
    } catch (error) {
      console.error('Fetch Error:', error); // Log the entire error object
      setAlertMessage(`Upload failed: ${error.message}`);
    }
  };

  const handleSubmit = async () => {
    // Heroku link: https://dsa-backend-1ca76fb6bbb8.herokuapp.com/datalake/assign_columns/?dataset_id=${uploadedFileName}&unit_column=${unitColumn}&date_column=${dateColumn}
    const url = `http://localhost:8000/datalake/assign_columns/?dataset_id=${uploadedFileName}&unit_column=${unitColumn}&date_column=${dateColumn}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
      });
      const data = await response.json();
      console.log('Response:', data);
      // Set the alert message with the response data
    if (data) {
      setAlertMessage(`${JSON.stringify(data.message)}`);

      // Redirect after a short delay to allow the user to see the message
      setTimeout(() => {
        router.push(`/datasets/raw/${uploadedFileName}`);
      }, 2000); // Adjust the delay as needed
    } else {
      setAlertMessage('No response data received');
    }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const newContent = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px' }}>
      <Title style={{ marginBottom: '20px' }} order={3}>Assign Date and Unit Metric</Title>
      <Select
        label="Select Unit Metric Column"
        placeholder="Select a column"
        style={{ marginTop: '10px', width: '300px' }}
        data={columns}
        onChange={(value) => setUnitColumn(value)}
      />
      <Select
        label="Select Date Column"
        placeholder="Select a column"
        style={{ marginTop: '10px', width: '300px' }}
        data={columns}
        onChange={(value) => setDateColumn(value)}
      />
      <Button
        style={{ marginTop: '20px', marginBottom: '30px', display: 'block', width: '300px' }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );

  // const newContent = (
  //   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '20px' }}>
  //     <Title style={{ marginBottom: '20px' }} order={3}>Assign Date and Unit Metric</Title>
  //     <Select label="Select Unit Metric Column" placeholder="Select a column" style={{ marginTop: '10px', width: '300px' }} data={columns} />
  //     <Select label="Select Date Column" placeholder="Select a column" style={{ marginTop: '10px', width: '300px' }} data={columns} />
  //     <Button style={{ marginTop: '20px', marginBottom: '30px', display: 'block', width: '300px' }}>Submit</Button>
  //   </div>
  // );

  useEffect(() => {
      setIsLoading(false);
      if (columns.length > 0) {
        console.log('Saved columns array:', columns);
      }
  }, []);

  return (
    <div>
      {!isLoading && displayMode === 'dropzone' && (
        <div className={classes.wrapper}>
          <Dropzone
            openRef={openRef}
            onDrop={(files) => {
              if (files.length > 0) {
                uploadFile(files[0]);
                setAlertMessage(`Uploaded ${files.map(file => file.name).join(', ')}`);
              }
            }}
            className={classes.dropzone}
            radius="md"
            accept={[MIME_TYPES.csv, MIME_TYPES.xls, MIME_TYPES.xlsx]}
            maxSize={50 * 1024 ** 2}
          >
            <div style={{ pointerEvents: 'none' }}>
              <Group justify="center">
                <Dropzone.Accept>
                  <IconDownload
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{ width: rem(50), height: rem(50) }}
                    color={theme.colors.red[6]}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
                </Dropzone.Idle>
              </Group>
              <Text ta="center" fw={800} fz="lg" mt="xl">
                <Dropzone.Accept>Drop files here</Dropzone.Accept>
                <Dropzone.Reject>CSV or Excel file less than 50mb</Dropzone.Reject>
                <Dropzone.Idle>Upload Dataset</Dropzone.Idle>
              </Text>
              <Text ta="center" fz="sm" mt="xs" c="dimmed">
                Drag&apos;n&apos;drop files here to upload.
                <br />
                We can accept only <i>.csv</i>, <i>.xls</i> and <i>.xlsx</i> files
                <br />
                that are less than 30mb in size.
              </Text>
            </div>
          </Dropzone>
  
          <Button className={classes.control} color="#1D72FE" variant="outline" size="md" mb="md" radius="xl" onClick={() => openRef.current?.()}>
            Select files
          </Button>
        </div>
      )}
  
      {!isLoading && displayMode === 'content' && newContent}
  
      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '20px 0' }}>
          <Loader color="teal" size="xl" type="dots" />
        </div>
      )}
  
      {alertMessage && displayMode === 'dropzone' && (
        <Alert variant="light" color="teal" title="Alert title" icon={icon} fw={400} my="md" mx="md">
          {alertMessage}
        </Alert>
      )}

      {alertMessage && displayMode === 'content' && (
        <Alert variant="light" color="green" title="Alert title" icon={icon} fw={400} my="md" mx="md">
          {alertMessage}
        </Alert>
      )}
      {/* {uploadedFileName && displayMode === 'content' && (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Text>Uploaded File: {uploadedFileName}</Text>
        </div>
      )} */}
    </div>
  );  
}
