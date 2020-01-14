const zxcvbn = require('zxcvbn');

console.log('Enter a password to calculate its strength');

process.stdin.on('data', function (data) {
  const password = data.toString('utf8').trim();
  const result = zxcvbn(password);
  console.log(result);
});
