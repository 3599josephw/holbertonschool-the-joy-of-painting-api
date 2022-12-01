# holbertonschool-the-joy-of-painting-api

## Database Setup
Once the repo is cloned:

- Make sure MySQL is installed: `sudo apt install mysql-server`
- Make sure mysql NodeJS package is installed in the directory: `npm install mysql`
- Run the main.js script: `node main.js`
- Once the console has logged all 3 lines, exit back to terminal

## Run the server

- Make sure express package is installed: `npm install express`
- Start the server: `node app.js`

## Queries

In the browser, go to 0.0.0.0/3000/filters

Filter options:
	- match (can be 1 or 0)
	- subject
	- months
	- colors

If match is 1, the query will return only episodes that match all of the filters
If match is 0, the query will return any episodes that match any of the filters

Example query: http://0.0.0.0:3000/filter?match=1&months=January&months=March&colors=Bright_Red&colors=Prussian_Blue&subject=cabin

The query will return a JSON result with the episodes' title, episode/season number, date aired, image link to the painting, link to the video on YouTube, all colors included in the painting, and subjects matching those requested