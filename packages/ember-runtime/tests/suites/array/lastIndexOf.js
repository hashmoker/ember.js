import { get } from 'ember-metal';
import { SuiteModuleBuilder } from '../suite';

const suite = SuiteModuleBuilder.create();

suite.module('lastIndexOf');

suite.test('should return index of object\'s last occurrence', function(assert) {
  let expected = this.newFixture(3);
  let obj      = this.newObject(expected);
  let len      = 3;

  for (let idx = 0; idx < len; idx++) {
    assert.equal(obj.lastIndexOf(expected[idx]), idx, `obj.lastIndexOf(${expected[idx]}) should match idx`);
  }
});

suite.test('should return index of object\'s last occurrence even startAt search location is equal to length', function(assert) {
  let expected = this.newFixture(3);
  let obj      = this.newObject(expected);
  let len      = 3;

  for (let idx = 0; idx < len; idx++) {
    assert.equal(obj.lastIndexOf(expected[idx], len), idx, `obj.lastIndexOfs(${expected[idx]}) should match idx`);
  }
});

suite.test('should return index of object\'s last occurrence even startAt search location is greater than length', function(assert) {
  let expected = this.newFixture(3);
  let obj      = this.newObject(expected);
  let len      = 3;

  for (let idx = 0; idx < len; idx++) {
    assert.equal(obj.lastIndexOf(expected[idx], len + 1), idx, `obj.lastIndexOf(${expected[idx]}) should match idx`);
  }
});

suite.test('should return -1 when no match is found', function(assert) {
  let obj = this.newObject(this.newFixture(3));
  let foo = {};

  assert.equal(obj.lastIndexOf(foo), -1, 'obj.lastIndexOf(foo) should be -1');
});

suite.test('should return -1 when no match is found even startAt search location is equal to length', function(assert) {
  let obj = this.newObject(this.newFixture(3));
  let foo = {};

  assert.equal(obj.lastIndexOf(foo, get(obj, 'length')), -1, 'obj.lastIndexOf(foo) should be -1');
});

suite.test('should return -1 when no match is found even startAt search location is greater than length', function(assert) {
  let obj = this.newObject(this.newFixture(3));
  let foo = {};

  assert.equal(obj.lastIndexOf(foo, get(obj, 'length') + 1), -1, 'obj.lastIndexOf(foo) should be -1');
});

export default suite;
