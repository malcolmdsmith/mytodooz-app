export function zeroToEmpty(num) {
  if (parseFloat(num) === 0) return "";
  return num;
}

export function zeroPad(num, places) {
  return String(num).padStart(places, "0");
}
