const fs = require('fs');
const readline = require('readline');
const { exec } = require("child_process");
const mysql = require('mysql');

/* main function */
async function main() {
  await runScript();

  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "joy_of_painting",
    multipleStatements: true
  });

  await con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to MySQL!");
  });

  await episodeDates(con);
  //await tempTables(con);

  //let sql = "CREATE TABLE IF NOT EXISTS episode_data AS (SELECT * FROM tmp_dates, tmp_colors, tmp_subject);";

  /*let sql = "CREATE TABLE episode_data LIKE bar;"
  await con.query(sql, function(err, result) {
    if (err) throw err;
    console.log('episode_data table created');
  });*/

  /*sql = "DROP TABLE tmp_colors; DROP TABLE tmp_dates; DROP TABLE tmp_subject;"
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log('tmp tables dropped;');
  });*/
}

/* run sql script to create database, tables, and insert both csv file data */
function runScript() {
  return new Promise((resolve) => {
    exec("mysql -uroot < create_db.sql", (error, stdout, stderr) => {

      if (error) {
          console.log(`error: ${error.message}`);
          return;
      }
      if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
      }
      console.log(`Script completed: Database created, csv files inserted`);
      resolve();
    });
  });
}

async function episodeDates(con) {
  /* Convert episode_dates file to mysql */
  const fileStream = fs.createReadStream('The Joy Of Painting - Episode Dates.csv');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    let splitLine = line.split('" ');

    const epName = splitLine[0].replace('"', '');
    let date = splitLine[1].split(') ')[0].replace('(', '').replace(')', '').split(' ');
    const month = date[0];
    const day = date[1].replace(',', '');
    const year = date[2];
    const sql = 'INSERT INTO episode_dates (title, month, day, year) VALUES ("' + epName + '", "' + month + '", ' + day + ', ' + year + ')';
    con.query(sql, function(err, result) {
      if (err) throw err;
    });
  }
  console.log('Episode_Dates file inserted');
}

async function tempTables(con) {
  const sql = "CREATE TABLE IF NOT EXISTS tmp_dates AS (SELECT * FROM episode_dates); ALTER TABLE tmp_dates DROP COLUMN day, DROP COLUMN year; \
  CREATE TABLE IF NOT EXISTS tmp_colors AS (SELECT * FROM colors_used); ALTER TABLE tmp_colors DROP COLUMN painting_index, DROP COLUMN img_src, \
  DROP COLUMN painting_title, DROP COLUMN season, DROP COLUMN episode, DROP COLUMN num_colors, DROP COLUMN colors, DROP COLUMN color_hex; \
  CREATE TABLE IF NOT EXISTS tmp_subject AS (SELECT * FROM subject_matter); ALTER TABLE tmp_subject DROP COLUMN title, DROP COLUMN episode; \
  ";


  await con.query(sql, function(err, result) {
    if (err) throw err;
    console.log('tmp_tables table created');
  });
}

main();






/* Populate main data table with info from other tables */
  /*const sql = "CREATE TABLE IF NOT EXISTS ep_data AS\
  (SELECT episode_dates.title, episode_dates.month, colors_used.youtube_src, \
    subject_matter.apple_frame, subject_matter.aurora_borealis, subject_matter.barn, \
    subject_matter.beach, subject_matter.bridge, subject_matter.building, subject_matter.bushes, \
    subject_matter.cabin, subject_matter.cactus, subject_matter.circle_frame, subject_matter.cirrus, \
    subject_matter.cliff, subject_matter.clouds, subject_matter.conifer, subject_matter.cumulus, \
    subject_matter.deciduous, subject_matter.diane_andre, subject_matter.dock, subject_matter.double_oval_frame, \
    subject_matter.farm, subject_matter.fence, subject_matter.fire, subject_matter.florida_frame, \
    subject_matter.flowers, subject_matter.fog, subject_matter.framed, subject_matter.grass, subject_matter.guest, \
    subject_matter.half_circle_frame, subject_matter.half_oval_frame, subject_matter.hills, subject_matter.lake, \
    subject_matter.lakes, subject_matter.lighthouse, subject_matter.mill, subject_matter.moon, subject_matter.mountain, \
    subject_matter.mountains, subject_matter.night, subject_matter.ocean, subject_matter.oval_frame, subject_matter.palm_trees, \
    subject_matter.path, subject_matter.person, subject_matter.portrait, subject_matter.rectangle_3d_frame, \
    subject_matter.rectangle_frame, subject_matter.river, subject_matter.rocks, subject_matter.seashell_frame, \
    subject_matter.snow, subject_matter.snowy_mountain, subject_matter.split_frame, subject_matter.steve_ross, \
    subject_matter.structure, subject_matter.
    FROM episode_dates, colors_used, subject_matter);\
  "*/