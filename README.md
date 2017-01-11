# get-fb-group-members
Get the members of a FB group, save to JSON file.

## Usage

1. Clone repo, `~$ npm install`.
2. `~$ ACCESS_TOKEN=[your facebook access token here] node getMembers.js [group id here]`. Get an access token from [the explorer](https://developers.facebook.com/tools/explorer/). Get the group id from the group's URL.
3. Console output shows progress, saving to and overwriting a file named `members_[group id].json` in your current directory for every page (yes it's inefficient, I wrote it in 15 min).

N.B. This is probably a violation of [Facebook's scraping TOS](https://www.facebook.com/apps/site_scraping_tos_terms.php) which basically says, "thou shalt not scrape." So, use at your own risk, MIT license, etc.
