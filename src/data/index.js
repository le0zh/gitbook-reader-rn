import { NativeModules, AsyncStorage } from 'react-native';

exports.get = function get(api, params) {
  const opt = {
    method: 'GET',
  };

  return fetch(api, opt)
    .then(response => {
      // 如果请求的返回结果不是OK则返回空数组，UI显示无数据
      if (response.status !== 200) {
        return [];
      }

      return response.json();
    })
    .catch(e => {
      console.log(`[API][error] ${e}`);
    });
};

export function getAllBooks(page) {
  return fetch(`https://api.gitbook.com/books/all?limit=10&page=${page}`).then(res => res.json());
}

export function getBook(id) {
  return fetch(`https://api.gitbook.com/book/${id}`).then(res => res.json());
}

const historyKey = id => `@history#${id}`;
/**
 * 保存阅读记录
 */
export function saveReadHistory(bookInfo) {
  // 记录额外的信息
  bookInfo.lastReadTime = Date.now();

  console.log('save history', historyKey(bookInfo.id));

  AsyncStorage.setItem(historyKey(bookInfo.id), JSON.stringify(bookInfo));
}

/**
 * 读取阅读记录
 */
export function getReadHisotry() {
  console.log('get historys');

  return AsyncStorage.getAllKeys().then(keys => {
    const historyKeys = [];
    keys.forEach(key => {
      if (key.indexOf('@history') === 0) {
        historyKeys.push(key);
      }
    });

    return AsyncStorage.multiGet(historyKeys).then(res => {
      return res.map(item => JSON.parse(item[1]));
    });
  });
}
