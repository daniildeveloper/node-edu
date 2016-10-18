#Edu konspekt

## Forms

## Cookies
* To install: 
```
$ npm install --save cookie-parser
```
* to enable:
```app.use(require('cookie-parser')(credentials.cookieSecret)) ```
* to set cookie
``` res.cookie('monster', 'mom mom'); ```
* to get cookie value
```javascript
var monster = res.cookies.monster;
```
* to delete
```javascript
res.clearCookie('monster');
```
* this optons can be installed by cookie initialization:
 - domain
 - path
 - maxAge
 - secure - https only
 - httpOnly - cookie can be changed only by server.
 - signed ```res.cookies```->```res.signedCookies```    

## Tips

* to run mocha test shell it:
```bash
$ mocha -u tdd -R spec public/qa/test-unit.js
```