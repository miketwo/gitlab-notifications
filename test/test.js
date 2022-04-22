const assert = require('assert');
const t = require('../index');
const symbol = 'AAPL';
const companyName = 'Apple Inc.';

describe('GitLab', () => {

  describe('#generateSignal(quote)', function () {
    it('generates the signal', function () {
      return buildApp().then(app => {
        const quote = require('./test-quote.json');
        const signal = app.generateSignal(quote);
        console.log(JSON.stringify(signal));
        assert.ok(signal);
        assert(signal.message.includes('Placeholder'));
      })
    })
  });

  describe('#run()', () => {
    it('can run', async function () {
      return buildApp().then(app => {
        return app.run().then((signal) => {
          assert.ok(signal);
          assert(signal.name.includes('Placeholder'));
          assert(signal.message.includes('Placeholder'));
        }).catch((error) => {
          assert.fail(error)
        });
      });
    });
  });
})

const baseConfig = {
  extensionId: 'q-applet-stock-quote',
  geometry: {
    width: 1,
    height: 1,
  },
  applet: {
    user: {
      symbol: symbol
    }
  }
};

async function buildApp(config) {
  const app = new t.GitLab();
  return app.processConfig(config || baseConfig).then(() => {
    return app;
  });
}