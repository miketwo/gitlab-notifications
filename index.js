const q = require('daskeyboard-applet');
const request = require('request-promise');
const logger = q.logger;

const apiUrl = 'https://cloud.iexapis.com/v1';


class GitLab extends q.DesktopApp {

  constructor() {
    super();
    // run every 5 secs
    this.pollingInterval = 5 * 1000;
  }

  // getQuote(apiUrl, access_token) {
  //   const options = {
  //     uri: apiUrl,
  //     headers: {
  //         'PRIVATE-TOKEN': access_token
  //     },
  //     json: true // Automatically parses the JSON string in the response
  //   };

  //   return request(options);
  // }

  generateSignal() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    const color = "#" + randomColor;
    logger.info(`Selected color is ${color}`)

    return new q.Signal({
      points: [
        [new q.Point(color)]
      ],
      name: `Placeholder`,
      message: `Placeholder`
    });
  }

  async run() {
    logger.info("Gitlab notifications running.");
    return this.generateSignal();
    
    // const access_token = this.config.access_token;

    // API="${CI_API_V4_URL}/projects/${CI_PROJECT_ID}"
    // AUTH_HEADER="PRIVATE-TOKEN: ${GITLAB_PRIVATE_TOKEN}"
    // CHILD_PIPELINES=$(curl -sS --header "${AUTH_HEADER}" "${API}/pipelines/${CI_PIPELINE_ID}/bridges")

    // if (symbol) {
    //   logger.info("My symbol is: " + symbol);
    //   return this.getQuote(symbol).then(quote => {
    //     return this.generateSignal(quote);
    //   }).catch((error) => {
    //     logger.error("Error while hitting API:" + error);
    //     return q.Signal.error([`The GitLab Notification service returned an error: ${error}`]);
    //   });
    // } else {
    //   logger.info("No symbol configured.");
    //   return null;
    // }
  }

  // async applyConfig() {
  //   const symbol = this.config.symbol;

  //   var tokenRequest = await request.get({
  //       url: `https://q.daskeyboard.com/api/1.0/misc/get_stock_quote_token`,
  //       json: true
  //     });

  //   this.token = tokenRequest.value;

  //   if (symbol) {
  //     return this.getQuote(symbol).then((response) => {
  //       return true;
  //     }).catch((error) => {
  //       throw new Error("Error validating symbol: " + symbol, error);
  //     });
  //   }
  // }
}


module.exports = {
  GitLab: GitLab
};

const applet = new GitLab();
