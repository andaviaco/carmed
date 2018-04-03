export default function listFormatter(value) {
  const result = value.split(',').map(s => s.trim());

  return result;
}
