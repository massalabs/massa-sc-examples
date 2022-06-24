const include_bytes_regex = /fileToBase64\(((?:'.+')|(?:".+"))\);?/i;
module.exports = (line) => line.match(include_bytes_regex);
