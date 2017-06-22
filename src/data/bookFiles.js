import { NativeModules } from 'react-native';
import fastXmlParser from 'fast-xml-parser';
import RNFS from 'react-native-fs';

import { saveDownloadItem } from './dataBase';

const MyNativeModule = NativeModules.MyNativeModule;

// 保存下载列表
const downloadingBooks = new Set();

/**
 * 确保目标文件夹存在
 */
function makeSureDirExist(dir) {
  return new Promise((resolve, reject) => {
    RNFS.exists(dir).then(dirExists => {
      if (dirExists) {
        resolve();
      } else {
        RNFS.mkdir(dir).then(() => {
          resolve();
        });
      }
    });
  });
}

/**
 * 执行下载流程
 */
function executeDownloadFlow(DIR, book) {
  const downlosdFileOpt = {
    fromUrl: book.urls.download.epub,
    toFile: `${DIR}/book.epub`,
    background: true,
    progressDivider: 10,
    progress: res => {
      // 下载进度
      console.log(res);
    },
  };

  // 下载
  const downloadRes = RNFS.downloadFile(downlosdFileOpt);

  return downloadRes.promise
    .then(res => {
      // 解压并生成目录文件
      unzip(book.id);

      // 保存下载记录
      saveDownloadItem(book.id, book.title, book.cover.small, res.bytesWritten);

      // 从下载中列表移除
      downloadingBooks.delete(book.id);

      return downloadRes;
    })
    .catch(err => {
      console.warn(err.message);
    });
}

/**
 * 根据bookId获得文件目录
 */
export function getDirFromBookId(bookId) {
  return `${RNFS.DocumentDirectoryPath}/download/${bookId.replace('/', '-')}`;
}

/**
 *　下载
 */
export function downloadAsync(book) {
  const DIR = getDirFromBookId(book.id);

  downloadingBooks.add(book.id);

  return makeSureDirExist(DIR).then(() => {
    return executeDownloadFlow(DIR, book);
  });
}

/**
 * 检测指定书籍是否在下载中
 * @param {string} bookId 
 */
export function checkIsDownloadingOrNot(bookId) {
  return downloadingBooks.has(bookId);
}

/**
 * 解压缩
 */
function unzip(bookId) {
  const DIR = getDirFromBookId(bookId);
  const path = `${DIR}/book.epub`;

  const contentDir = `${DIR}/content`;

  const doUnzip = () => {
    // 解压缩
    MyNativeModule.unZipFile(path, contentDir)
      .then(res => {
        console.log('unzip done', res);

        // 生成目录文件
        RNFS.readFile(`${contentDir}/toc.ncx`).then(content => {
          const start = content.indexOf('<navMap>');
          const end = content.indexOf('</navMap>');

          const navContent = content.substr(start, end - start + 1);

          var xml = fastXmlParser.parse(navContent, {
            ignoreNonTextNodeAttr: false,
            ignoreTextNodeAttr: false,
            attrPrefix: '_',
          });

          const toc = xml.navMap.navPoint;

          RNFS.writeFile(`${DIR}/toc.json`, JSON.stringify(toc), 'utf8').then(success => {
            console.log(`${bookId} toc FILE WRITTEN!`);
          });
        });
      })
      .catch(e => {
        console.warn(e);
      });
  };

  makeSureDirExist(contentDir).then(doUnzip);
}

// 删除书籍文件
export function deleteBoookFile(bookId) {
  const DIR = getDirFromBookId(bookId);

  RNFS.unlink(DIR)
    .then(() => {
      console.log(`${bookId} FILE DELETED`);
    })
    .catch(err => {
      console.log(err.message);
    });
}
