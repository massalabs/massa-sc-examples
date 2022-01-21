const include_bytes_regex = /include_base64\(["']+([\.a-z_\-\/\\ ]*)["']+\)[;]+/i;
module.exports = (line) => line.match(include_bytes_regex);