export function parserParams(path: string) {

  const params = path
    .toLowerCase()
    .replace(/[^a-z0-9=;,]/g, '')
    .replace(/;+/g, '_')
    .replace(/=+/g, '=')
    .split('_')

  const data = params.reduce((res: {[key: string]: any}, item) => {
    const [key, value] = item.split('=');

    if (key)
      switch (key) {
        case 'page': res[key] = value; break;
        case 'sort_desc': res[key] = value; break;
        case 'sort_asc': res[key] = value; break;
        
        default: res['names'] = {
          ...res['names'],
          [key]: value.split(',')
        }
      }

    return res;
  }, {})

  return data;
}