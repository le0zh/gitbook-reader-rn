/* @flow */

import { PixelRatio, Dimensions } from 'react-native';

exports.px2dp = function px2dp(px: number): number {
  if (typeof px !== 'number') {
    console.error('输入必须为数字');
    return px;
  }

  return px / PixelRatio.get();
};

/**
 * 格式化字符串
 * @template 模板字符串
 * const message = stringFormat('{0} and {1} is awesome!', 'react', 'rn);
 * >> message: 'react and rn is awesome！'
 */
exports.stringFormat = function stringFormat(template: string, ...values: any): string {
  const args = values;
  return template.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] !== 'undefined' ? args[number] : match;
  });
};

/**
 * 屏幕尺寸
 */
const { width, height } = Dimensions.get('window');
exports.SCREEN_WIDTH = width;
exports.SCREEN_HEIGHT = height;
