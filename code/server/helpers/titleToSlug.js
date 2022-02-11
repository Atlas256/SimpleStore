export function titleToSlug(str) {
  return str.trim().toLowerCase().replace(/[^a-zа-я0-9]/g, '_').split(' ').join('_')
}