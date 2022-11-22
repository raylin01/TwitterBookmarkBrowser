# Using Twitter Bookmark Downloader

This is a Twitter Bookmark downloader so you can keep and view your Twitter Bookmarks locally. We will be using Dewey to scrape Twitter bookmarks, then running the script to download all the data from Dewey and Twitter CDNs, and finally running our own server to view the downloaded bookmarks.

Note: This is an unofficial tool not supported by Dewey or Twitter. I hope this is helpful.

## Requirements
You must have Python3, NodeJS and NPM installed to run this application.

## Step 1: Use Dewey

First, go to [https://getdewey.co/](https://getdewey.co/) and follow their steps to extract Twitter Bookmarks to the Dewey Account. You may only be able to extract 744 latest bookmarks (due to how Twitter bookmarks are structured). You can try to get more bookmarks by deleting some (make sure to do so on a browser without Dewey installed, otherwise it will also delete the tweets from your Dewey)

## Step 2: Run the Script (getdewey.py)

To run the script, first we must change some of the necessary variables. You need to get the folder id and token from the Network Tab of Chrome Developer Tools. To do so, press F12 to open Developer Tools, then switch to the network tab. Refresh the Dewey page [https://getdewey.co/account](https://getdewey.co/account), then filter the network results by "?folder". You should now see the request with your folder id. To get the token, go to the Headers section of the request, and the token is the Authorization value under the request section. 

The other variables you can change are:
| Variable Name      | Description | Default |
| ----------- | ----------- |----------- |
| path      | The path to put the data. Should not be changed unless you know what you are doing.  | "data/" |
| pages   | The number of pages to download. Use 0 for all pages.        | 0 |
| start_page | The page of Dewey to start on. Dewey organizes in pages of 20. | 1 |
| media | Download media to local machine. If you do not download, the media will be served by Twitter CDN. | True |
| folder_id | The folder from the request from Dewey. | "" |
| token | The authorization token from the request from Dewey. | "" |
| redownload | Redownload tweets that have already been downloaded. | False |
| verbose | Output at every tweet download. | True |

## Step 3: Run our tweet application

If this is your first time running the application, you must run the installation to install the necessary dependencies of the application. If you have done this step once already, you do not need to repeat it. Run

### `npm install`

to install necessary dependencies

To run our Bookmark viewer application, in the same console at the root of this folder, run 

### `npm start`

This will launch the react server and you should be able to access the application at [http://localhost:3000](http://localhost:3000) if it doesn't open automatically.