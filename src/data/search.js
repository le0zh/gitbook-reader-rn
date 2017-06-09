export function search(keyword, page = 0) {
  return fetch(`https://www.gitbook.com/search?q=${keyword}&page=${page}&type=books&sort=stars`).then(res => {
    const html = res._bodyInit;
    const books = parseHtml(html);

    return {
      list: books,
    };
  });
}

function parseHtml(html) {
  const reg = new RegExp('<div class="Book" data-reactid=(.*?)</div></div>', 'g');

  const result = html.match(reg);

  if (result === null) {
    return [];
  }

  const books = result.map(div => parseBook(div));
  return books;
}

function parseBook(fragment) {
  const reg = new RegExp('<a href="(.*?)</a>', 'g');

  const result = reg.exec(fragment)[1]; //  https://www.gitbook.com/book/hulufei/react-tutorial" data-reactid="93">React 入门教

  const id = result.substring(0, result.indexOf('"')).replace('https://www.gitbook.com/book/', '');
  const title = result.substring(result.indexOf('>') + 1);

  const infoReg = new RegExp('<p class="description"(.*?)</p>', 'g');
  const descResult = infoReg.exec(fragment);
  let desc = '';

  if (descResult != null) {
    desc = descResult[1].substring(descResult[1].indexOf('>') + 1);
  }

  return {
    id,
    title,
    desc,
  };
}
