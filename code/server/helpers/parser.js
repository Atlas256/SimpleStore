export function parser(req) {

  const params = String(req.params['0'])
    .toLowerCase()
    .replace(/[^a-z0-9=;,]/g, '')
    .replace(/;+/g, '_')
    .replace(/=+/g, '=')
    .split('_')

  const data = params.reduce((res, item) => {
    const [key, value] = item.split('=');

    if (key)
      switch (key) {
        case 'page': res[key] = value; break;
        case 'sort': res[key] = value; break;
        default: res['filters'] = {...res['filters'], [key]: value.split(',')}
      }

    return res;
  }, {})

  return data;
}