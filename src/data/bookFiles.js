import { NativeModules } from 'react-native';
import fastXmlParser from 'fast-xml-parser';
import RNFS from 'react-native-fs';

const MyNativeModule = NativeModules.MyNativeModule;

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

  // 1.下载
  const res = RNFS.downloadFile(downlosdFileOpt);

  return res.promise
    .then(res => {
      book.size = res.bytesWritten;
      book.downloadDate = Date.now();

      // 2.保存meta.json
      return RNFS.writeFile(`${DIR}/meta.json`, JSON.stringify(book), 'utf8').then(success => {
        console.log(`${book.id} meta FILE WRITTEN!`);

        // 解压并生成目录文件
        unzip(book.id);

        // 将下载的结果返回出去
        return res;
      });
    })
    .catch(err => {
      console.warn(err.message);
    });
}

/**
 * 根据bookId获得文件目录
 */
function getDirFromBookId(bookId) {
  return `${RNFS.DocumentDirectoryPath}/download/${bookId.replace('/', '-')}`;
}

/**
 *　下载
 */
export function downloadAsync(book) {
  const DIR = getDirFromBookId(book.id);

  return makeSureDirExist(DIR).then(() => {
    return executeDownloadFlow(DIR, book);
  });
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
