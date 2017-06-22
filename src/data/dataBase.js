// @flow

import Realm from 'realm';
import { deleteBoookFile } from './bookFiles';

/**
 * 阅读记录
 */
const HistorySchema = {
  name: 'History',
  primaryKey: 'bookId',
  properties: {
    bookId: 'string', // 书的id
    title: 'string', // 书的标题
    cover: 'string', // 书的封面
    lastReadAt: 'date', // 上次阅读时间
  },
};

/**
 * 下载记录
 */
const DownloadSchema = {
  name: 'Download',
  primaryKey: 'bookId',
  properties: {
    bookId: 'string', // 书的id
    title: 'string', // 书的标题
    cover: 'string', // 书的封面
    size: 'int', // 文件大小 kb
    downloadAt: 'date', // 下载时间
  },
};

/**
 * 阅读进度
 */
const ProgressSchema = {
  name: 'Progress',
  primaryKey: 'bookId',
  properties: {
    bookId: 'string', // 书的id
    src: 'string', // 阅读的文件
    readAt: 'date', // 阅读时间
    position: { type: 'int', default: 0, optional: true }, // 阅读位置
  },
};

const realm = new Realm({
  schema: [HistorySchema, DownloadSchema, ProgressSchema],
  schemaVersion: 2,
  // migration: (oldRealm, newRealm) => {
  //   if (oldRealm.schemaVersion < 2) {

  //   }
  // },
});

/**
 * 保存下载记录
 */
export function saveDownloadItem(bookId: string, title: string, cover: string, size: number) {
  realm.write(() => {
    realm.create('Download', { bookId, title, cover, size, downloadAt: new Date() });
  });
}

/**
 * 获取下载列表的分页数据
 * @param {number} page 页码
 */
export function getDownloadItems(page: number = 0) {
  const pageSize = 10;
  page = page + 1;
  let items = realm.objects('Download').sorted('downloadAt', true).slice((page - 1) * pageSize, pageSize);

  return items;
}

/**
 * 检查指定bookId是否已经被下载
 * @param {string} bookId 
 */
export function checkIsDownloadOrNot(bookId: string) {
  let books = realm.objects('Download').filtered(`bookId = "${bookId}"`);

  return books.length > 0;
}

/**
 * 获取所有的下载书籍的id
 */
export function getAllDownloadIds() {
  return realm.objects('Download').map(item => item.bookId);
}

export function getDownloadItemsAsync(page: number = 0) {
  return new Promise((resolve, reject) => {
    try {
      const items = getDownloadItems(page);
      resolve({
        list: items,
      });
    } catch (e) {
      reject(e);
    }
  });
}

export function deleteOneDownloadItem(bookId: string) {
  let books = realm.objects('Download').filtered(`bookId = "${bookId}"`);

  if (books.length > 0) {
    realm.write(() => {
      realm.delete(books[0]);
    });
  }

  deleteBoookFile(bookId);
}

/**
 * 保存阅读进度
 */
export function saveReadProgress(bookId: string, src: string, pos: number) {
  realm.write(() => {
    // 第三个参数true表示，当前主键已经存在时，直接更新， 否则创建
    realm.create('Progress', { bookId, src, readAt: new Date(), position: pos }, true);
  });
}

/**
 * 获取阅读进度，当前只是文件级别
 * @param {string} bookId 
 */
export function getReadProgress(bookId: string): { src: string, position: number } {
  let books = realm.objects('Progress').filtered(`bookId = "${bookId}"`);

  if (books.length > 0) {
    return {
      src: books[0].src,
      position: books[0].position,
    };
  }

  // 没有阅读进度，返回首页
  return {
    src: 'index.html',
    position: -100,
  };
}
