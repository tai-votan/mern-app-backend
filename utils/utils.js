export function stripHTML(str) {
  try {
    return str
      .replace(/<[^>]+>/g, ' ')
      .replace(/ +/g, ' ')
      .trim();
  } catch (err) {
    console.log(`Func stripHTML Line: 8, PARAMS: { err }`, { err });
  }
  return null;
}

export function toSlug(str) {
  try {
    return stripHTML(str)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd')
      .replace(/([^0-9a-z-\s])/g, '-')
      .replace(/(\s+)/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  } catch (err) {
    console.log(`Func toSlug Line: 17, PARAMS: { err }`, { err });
  }
}
