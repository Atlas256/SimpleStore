export default function (str: string) {

  const params = str
    .toLowerCase()
    .replace(/\//g, ';')
    .replace(/[^a-z0-9=;,_]/g, '')
    .split(';')

  const data = params.reduce((res: any, item) => {
    const [key, value] = item.split('=');

    switch (key) {
      case 'category': res[key] = value; break;
      case 'page': res[key] = value; break;
      case 'sort': res[key] = value; break;
      case '': break;
      default: res['filters'] = { ...res['filters'], [key]: value.split(',') }
    }
    return res;
  }, {})

  return data;
}