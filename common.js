'use strict';

function getRelativePath(path) {
  return path.substr(path.search('/') + 1);
}

module.exports.getRelativePath = getRelativePath;
