const assert = require('assert');
const bcrypt = require('bcrypt');

describe('Password encryption', function() {
  it('Should encrypt a password', function() {
    const password = 'test';
    const encrypted = bcrypt.hashSync(password, 10);

    assert.equal(bcrypt.compareSync(password, encrypted), true);
    assert.equal(bcrypt.compareSync('asdasdasd', encrypted), false);
  });
});
