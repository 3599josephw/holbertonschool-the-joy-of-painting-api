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
  console.log("Connected to MySQL!");
});

app.get('/', (req, res) => {
  res.send('query /filter with parameters')
});

app.get('/filter', (req, res) => {
  filter(req, res);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}!`)
});

function filter(req, res) {
  const { months , colors, subject, match } = req.query;

  // Example query

  /*let tmp = "SELECT e.title, e.month, c.Bright_Red, p.cabin \
  FROM episode_dates AS e  JOIN colors_used AS c ON e.title=c.painting_title\
  JOIN subject_matter AS s ON s.title=e.title \
  WHERE e.month IN ('January') AND c.Bright_Red = 1 AND c.Cadmium_Yellow=1  AND s.cabin = 1 AND s.diane_andre=1;"*/

  let andOr = "AND";
  if (match == 0) {
    andOr = "OR";
  }

  let sql = "SELECT e.title, s.episode, e.date, c.img_src, c.youtube_src, c.colors, c.color_hex";
  let subjectQuery = ""
  if (subject) {
    if (Array.isArray(subject)) {
      for (let i = 0; i < subject.length; i++) {
        sql += `, s.${subject[i]}`;
        subjectQuery += ` ${andOr} s.${subject[i]}=1`
      }
    } else {
      sql += `, s.${subject}`;
      subjectQuery += ` ${andOr} s.${subject}=1`
    }
  }

  sql += " FROM episode_dates AS e JOIN colors_used AS c ON e.title=c.painting_title \
  JOIN subject_matter AS s ON s.title=e.title";


  let monthQuery = ""
  if (months) {
    monthQuery = " AND e.month IN (";
    if (Array.isArray(months)) {
      for (let i = 0; i < months.length; i++) {
        monthQuery += "'" + months[i] + "'";
        if (i != months.length - 1) {
          monthQuery += ", ";
        }
      }
    } else {
      monthQuery += `'${months}'`
    }
    monthQuery += ")";
  }

  let colorQuery = "";
  if (colors) {
    if (Array.isArray(colors)) {
      for (let i = 0; i < colors.length; i++) {
        colorQuery += ` ${andOr} c.${colors[i]}=1`;
      }
    } else {
      colorQuery += ` ${andOr} c.${colors}=1`;
    }
  }
  if (subject || months || colors) {
    sql += " WHERE e.title=s.title";
  }
  sql += `${monthQuery} ${colorQuery} ${subjectQuery};`;

  con.query(sql, function (err, result, fields) {
    if (err) console.log(err), res.send('Query failed, woops!');
    console.log(result);
    res.send(result);
  });
}