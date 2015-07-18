/**
 * Slack plugin
 *
 * Push up / down event to slack channel
 *
 * Installation
 * ------------
 *
 *   // in config/production.yaml
 *   plugins:
 *     # - ./plugins/slack
 *   Do not forget to add this key to you conf file
 *     slack:
 *       webhook: 'YOUR_WEB_HOOK'
 *       channel: '#yourchannelORgroup'
 */
var CheckEvent = require('../../models/checkEvent');
var config = require('config');
var slack = require('slack-notify')(config.slack.webhook.toString());

var slackMessage = {
  channel: config.slack.channel || '#general',
  text: 'Here is my notification',
  icon_emoji: ':computer:',
  unfurl_links: 1,
  username: 'Uptime'
}

exports.initWebApp = function() {
  console.log('init Slack plugin...');
  CheckEvent.on('afterInsert', function(checkEvent) {
    checkEvent.findCheck(function(err, check) {
      var sitename = check.name;
      if(checkEvent.message === 'up'){
        slackMessage.text = sitename;
        if (checkEvent.downtime) {
            slackMessage.text += ' went back up after ' +  Math.floor(checkEvent.downtime / 1000) + 's of downtime. '+check.url + ' :tada:';
          } else {
            slackMessage.text += ' is now up! Well done. Check here: '+check.url+' :tada:';
          }
        slack.send(slackMessage, function(err){
          console.log(err);
        });
      } else if(checkEvent.message === 'down') {
        slackMessage.text = '@group ' + sitename + ' is down! :boy: to the work on '+check.url+' :construction: ';
        slack.send(slackMessage, function(err){
          console.log(err);
        });
      }
    });
  });
}