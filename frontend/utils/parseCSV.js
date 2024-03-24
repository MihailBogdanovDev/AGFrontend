// utils/parseCSV.js
import Papa from 'papaparse';

export const parseCSV = async (csvFile) => {
  const response = await fetch(csvFile);
  const text = await response.text();
  const result = Papa.parse(text, { header: true, skipEmptyLines: true });
  return result.data;
};
