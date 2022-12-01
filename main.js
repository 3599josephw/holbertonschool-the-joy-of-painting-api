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
    const sql = `INSERT INTO episode_dates (title, month, day, year, date)\
    VALUES ("${epName}", "${month}", ${day}, ${year}, "${month}/${day}/${year}")`;
    con.query(sql, function(err, result) {
      if (err) throw err;
    });
  }
  console.log('Episode_Dates file inserted');
}

main();
