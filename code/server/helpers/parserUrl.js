export default function(req) {
  const str = req.params[0];

  const params = str
    .toLowerCase()
    .replace(/\//g, ';')
    .replace(/[^a-z0-9=;,_]/g, '')
    .split(';')

  const data = params.reduce((res, item) => {
    const [key, value] = item.split('=');

    switch (key) {
      case 'page': res[key] = value; break;
      case 'sort': res[key] = value; break;
      case '': break;
      default: res['filters'] = { ...res['filters'], [key]: value.split(',') }
    }
    return res;
  }, {})

  //console.log(data);

  return data;
}