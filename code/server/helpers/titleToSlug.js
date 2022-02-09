export function titleToSlug(str) {
  return str.trim().toLowerCase().replace(/[^a-z0-9]/g, '_').split(' ').join('_')
}