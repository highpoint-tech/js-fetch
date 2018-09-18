import { json } from '../src/index.js';

async function doesItThrow(fn) {
  let threwError = true;
  try {
    await fn();
    threwError = false;
  } catch (e) {
    /* Do nothing */
  }
  return threwError;
}

window.assert.throwsAsync = async (fn, msg) =>
  assert(await doesItThrow(fn), msg);

describe('fetch', () => {
  describe('#json()', () => {
    it('should return json', async () => {
      const response = await json(
        'http://localhost:9876/json?status=200&message=success'
      );
      assert.equal('success', response.message);
    });

    it('should error', async () => {
      await assert.throwsAsync(async () =>
        json('http://localhost:9876/json?status=500')
      );
    });
  });
});
