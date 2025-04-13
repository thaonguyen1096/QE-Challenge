import fs from 'fs';
import Papa from 'papaparse';

export function readCSV(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const file = fs.readFileSync(filePath, 'utf8');
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve(result.data),
      error: (error) => reject(error),
    });
  });
}
