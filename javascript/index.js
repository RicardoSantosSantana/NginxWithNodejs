const express = require('express');
const { Repository } = require('./repository');
const app = express();

app.get('/', async (_, res) => {

  const selectSql = `SELECT * FROM people`;
  const people = await Repository.query(selectSql);

  const title = '<h1 style="color:orange;font-weight:bold">Full Cycle Rocks!</h1>';
  const list = `
      ${people.map(p => `<p>${p.name}</p>`).join('')}     
  `;

  res.send(title + list);
});

app.listen(3000, () => {
  console.log('Running on port 3000');

  const createSql = `
    CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id));
  `;
  Repository.query(createSql);

  const insertSql = `
    INSERT INTO people (name) values ('Ricardo'), ('Mirian'), ('Yorkshire Docinho'), ('Wesley'),('Full Cycle Rocks!');
  `;
  Repository.query(insertSql);
});