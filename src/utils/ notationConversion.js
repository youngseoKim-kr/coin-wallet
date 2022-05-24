function notaionConversion(num) {
  const result = num
    .toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
    .substr(0, 15);

  return result;
}

export default notaionConversion;
