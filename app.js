const express = require('express');
const mysql = require('mysql');


const app = express();
const port = 3000;
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "joy_of_painting"
});
con.connect(async function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
  res.send('query /filter with parameters')
});

app.get('/filter', (req, res) => {
  const result = filter(req, res);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

function filter(req, res) {
  const { months } = req.query;
  const { colors } = req.query;
  const { subject } = req.query;
  console.log(req.query);
  let tmp = "SELECT episode_dates.title, month, colors, bushes FROM episode_dates\
  JOIN colors_used ON episode_dates.title=colors_used.painting_title\
  AND subject_matter.bushes=1\
  AND episode_dates.month IN ('January')\
  AND colors_used.Bright_Red=1\
  JOIN subject_matter ON episode_dates.title=subject_matter.title;"


  let sql = "SELECT title, month"
  if (months) {
    let monthQuery = "AND episode_dates.month IN (";
    for (let i = 0; i < months.length; i++) {
      monthQuery += "'" + months[i] + "'";
      if (i != months.length - 1) {
        monthQuery += ", ";
      }
    }
    monthQuery += ")";
  }

  if (colors) {
    if (Array.isArray(colors)) {
      for (let i = 0; i < colors.length; i++) {
        sql += `, ${colors[i]}`;
      }
    } else {
      sql += `, ${colors}`;
    }
  }

  if (subject) {
    if (Array.isArray(subject)) {
      for (let i = 0; i < subject.length; i++) {
        sql += `, ${subject[i]}`;
      }
    } else {
      sql += `, ${subject}`;
    }
  }


  con.query(tmp, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
  console.log(sql);
}