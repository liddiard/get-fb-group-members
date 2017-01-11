const request = require('superagent');
const jsonfile = require('jsonfile');

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const API_ROOT = 'https://graph.facebook.com/v2.8';
const GROUP_ID = process.argv[2];

let groupMembers = [];

function getMembers(nextPage) {
  request
  .get([API_ROOT, GROUP_ID, 'members'].join('/'))
  .query({
    access_token: ACCESS_TOKEN,
    fields: 'picture,name,updated_time',
    format: 'json',
    method: 'get',
    limit: 25,
    after: nextPage
  })
  .end((err, res) => {
    if (err) return console.error(err);
    // FB API is returning content-type=text/javascript for some reason
    // can't reproduce outside of node. this is a workaround.
    const body = JSON.parse(res.text);
    groupMembers = groupMembers.concat(body.data);

    // save to file, overwriting anything that's already there
    const filename = `members_${GROUP_ID}.json`;
    jsonfile.writeFile(filename, groupMembers, {spaces: 2}, err => {
      if (err) console.error(err);
    });

    // recurse on the next page, if any
    const nextPage = body.paging.cursors.after;
    if (nextPage) {
      console.log('getting members after:', nextPage);
      // wait a little to avoid getting ratelimited
      setTimeout(() => { getMembers(nextPage) }, 2000);
    }
    else {
      console.log('done.');
    }
  });
}

getMembers();
