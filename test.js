var crypto = require('crypto');
var name = 'password';
var hash = crypto.createHash('md5').update(name).digest('hex');
console.log(hash);