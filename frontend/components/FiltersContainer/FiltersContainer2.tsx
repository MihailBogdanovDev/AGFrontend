'use client';
import { SimpleGrid, Container, Stack, useMantineTheme } from '@mantine/core';
import ForecastChart from '../../components/ChartsComponent/ReChartsComponent';
import ForecastChart2 from '../../components/ChartsComponent/ReChartsComponent2';
import ForecastChart3 from '../../components/ChartsComponent/ReChartsComponent3';
import ForecastChart4 from '../../components/ChartsComponent/ReChartsComponent4';

export default function Subgrid() {
  const theme = useMantineTheme();
  return (
    <Container my="md">
      <SimpleGrid cols={{ base: 1, xs: 4 }}>
        {/* Charts Section */}
        <Stack gap={theme.spacing.md}>  {/* Adjusted 'spacing' to 'gap' */}
          <ForecastChart />
          <ForecastChart2 />
        </Stack>
        <Stack gap={theme.spacing.md}>  {/* Adjusted 'spacing' to 'gap' */}
          <ForecastChart3 />
          <ForecastChart4 />
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
