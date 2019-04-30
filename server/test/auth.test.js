const chai = require('chai');

const { expect } = chai;
const bcrypt = require('bcrypt');

describe('Password encryption', () => {
  it('Should encrypt a password', (done) => {
    const password = 'test';
    const encrypted = bcrypt.hashSync(password, 10);

    expect(bcrypt.compareSync(password, encrypted)).to.be.true;
    expect(bcrypt.compareSync('asdasdasd', encrypted)).to.be.false;
    done();
  });
});
