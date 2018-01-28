const placeholderRegex = /((.*?)\$\{([^}\$]+)+\})+?([^\$]*)?/g;
const strformat = require('strformat');

export function getUrlParts(url) {
  let matches;
  let placeHolders = [];
  let parts = [];
  while (matches = placeholderRegex.exec(url)) {
    parts.push(matches[2]);
    placeHolders.push(matches[3]);
    if (matches[4]) {
      parts.push(matches[4]);
    }
  }
  if (placeHolders.length && parts.length){
    return {
      placeHolders,
      parts,
    };
  }
}

export function formatUrl(url, placeHolders) {
  return strformat(url, placeHolders);
}

console.log(getUrlParts("https://${teamId}.freshdesk.com/helpdesk/tickets/view/${viewId}"));

