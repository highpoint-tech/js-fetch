import { json, postJSON, postForm } from '../src/index.js';

const doesItThrow = async fn => {
  let threwError = true;
  try {
    await fn();
    threwError = false;
  } catch (e) {
    /* Do nothing */
  }
  return threwError;
};

window.assert.throwsAsync = async (fn, msg) =>
  assert(await doesItThrow(fn), msg);

// Set base URI
(() => {
  let el = document.querySelector('base');
  if (!el) {
    el = document.createElement('base');
    document.querySelector('head').appendChild(el);
  }
  el.href = new URL(document.baseURI).origin;
})();

describe('fetch', () => {
  describe('#json()', () => {
    it('should return json', async () => {
      const response = await json('json?status=200&message=success');
      assert.equal('success', response.message);
    });

    it('should error', async () => {
      await assert.throwsAsync(async () => json('json?status=500'));
    });
  });

  describe('#postForm()', () => {
    it('should return json', async () => {
      const response = await postForm('json?status=200', {
        body: 'message=success'
      });
      assert.equal('success', response.message);
    });
  });

  describe('#postJSON()', () => {
    it('should return sent message', async () => {
      const response = await postJSON('json?status=200', {
        body: {
          message: 'awesome'
        }
      });
      assert.strictEqual(response.message, 'awesome');
    });
    it('should work without options', async () => {
      const response = await postJSON('json?status=200');
      assert.strictEqual(response.message, 'test');
    });
  });
});
