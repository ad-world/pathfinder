export function calculateGridDimensions(
  screenWidth: number,
  screenHeight: number,
  cellSize: number
) {
  const columns = Math.floor(screenWidth / cellSize);
  const rows = Math.floor(screenHeight / cellSize);

  return { rows, columns };
}

export const createGrid = (rows: number, columns: number): number[][] => {
  const cellGrid: number[][] = [];
  for (let i = 0; i < rows; i++) {
    const row: number[] = [];
    for (let j = 0; j < columns; j++) {
      row.push(0);
    }
    cellGrid.push(row);
  }

  return cellGrid;
};
