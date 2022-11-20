// Save API keys and access token info
// module.exports = {
//     consumer_key:         'qS9W0hrctjLoVldpOabJox1Bb',
//     consumer_secret:      '8JtkpffXtdwqe5I7OGTUr5oBcSn61zrlUB302YuYLaGjIDLejv',
//     access_token:         '1593415433033584641-kpl4GJTFa7W8FuhYPnB3mTL7nHZ7oO',
//     access_token_secret:  'EQvna3tXNjImbJsBMumnxf9GNU818T1bMKE2QQhC54Mii',
//     timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
//     strictSSL:            true,     // optional - requires SSL certificates to be valid.
// }

require('dotenv').config();

module.exports = {
    consumer_key:         process.env.CONSUMER_KEY,
    consumer_secret:      process.env.CONSUMER_SECRET,
    access_token:         process.env.ACCESS_TOKEN,
    access_token_secret:  process.env.ACCESS_TOKEN_SECRET,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
}
