export function getImage(image) {
  try {
    return require(`../assets/${image}`);
  } catch (e) {
    return '';
  }
}
