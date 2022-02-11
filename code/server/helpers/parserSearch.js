export default function(req) {
  const str = req.params[0];

  const params = str
    .toLowerCase()
    .replace(/\//g, ';')
    .replace(/[^a-zа-я0-9=;,_ ]/g, '')
    .split(';')

  const data = params.reduce((res, item) => {
    const [key, value] = item.split('=');

    switch (key) {
      case 'text': res[key] = value; break;
      case '': break;
      default: break;
    }
    return res;
  }, {})

  //console.log(data);

  return data;
}