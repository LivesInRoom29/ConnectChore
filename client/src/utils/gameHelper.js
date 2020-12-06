export const createDefaultBoard = () => {
  const box = [];
  for (let y = 5; y >= 0; y--) {
    const row = [];
    for (let x = 0; x < 7; x++) {
      row.push({
        color: "white",
      });
    }

    box.push(row);
  }
  return box;
};
