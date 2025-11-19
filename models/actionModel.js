const db = require("../db");

module.exports = {
  createAction(data) {
    const stmt = db.prepare(`
      INSERT INTO actions (name, url, method)
      VALUES (?, ?, ?)
    `);
    const result = stmt.run(data.name, data.url, data.method);
    return result.lastInsertRowid;
  },

  getAllActions() {
    return db.prepare("SELECT * FROM actions").all();
  },

  getActionById(id) {
    return db.prepare("SELECT * FROM actions WHERE id = ?").get(id);
  },

  updateStatus(id, status) {
    return db
      .prepare("UPDATE actions SET status = ? WHERE id = ?")
      .run(status, id);
  },

  patchAction(id, body) {
    const fields = [];
    const values = [];

    for (const key in body) {
      fields.push(`${key} = ?`);
      values.push(body[key]);
    }

    values.push(id);

    const stmt = db.prepare(`
      UPDATE actions
      SET ${fields.join(", ")}
      WHERE id = ?
    `);

    return stmt.run(...values);
  }
};
