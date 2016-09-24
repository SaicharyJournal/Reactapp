/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

// This Webpack plugin warns the user when using special webpack syntax
// to disable loaders (https://webpack.github.io/docs/loaders.html#loader-order)
// This makes it very coupled to webpack and might break in the future.
// See https://github.com/facebookincubator/create-react-app/issues/733.

'use strict';

var chalk = require('chalk');

class WarnAboutLoaderDisablingPlugin {
  apply(compiler) {
    compiler.plugin('normal-module-factory', (normalModuleFactory) => {
      normalModuleFactory.plugin('before-resolve', (data, callback) => {
        if (data.request.match(/^-?!!?/)) {
          chalk.yellow(`Warning: You are requesting '${data.request}'. Special Webpack Loaders syntax is not officially supported and makes you code very coupled to Webpack, which might break in the future, we recommend that you remove it. See `https://github.com/facebookincubator/create-react-app/issues/733`);
        }
        callback(null, data);
      })
    });
  }
}

module.exports = WarnAboutLoaderDisablingPlugin;
