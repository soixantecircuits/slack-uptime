# Slack uptime plugin

A simple plugin to post some information about up and down event for your uptime server (https://github.com/fzaninotto/uptime)

## Dependency
We rely on `slack-notify` as this is a 10 minutes project :)
Read more about slack integration here: https://api.slack.com/incoming-webhooks
[Slack notify](https://github.com/andrewchilds/slack-notify)
So do not forget to run `npm install` in the slack-uptime folder.

## Installation

1. Clone this repo inside `plugins/` folder under the name of slack-uptime
2. Add the following line to you config file :

Under the plugins section of conf file :

```
  - ./plugins/slack-uptime
```

Anywhere at top level

```
slack:
  webhook: 'YOUR_WEBHOOK'
  channel: '#yourgroupORchannel'
```

In the plugin slack-uptime folder please run :

`npm install`

Enjoy !