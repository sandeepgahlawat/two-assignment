export default function makeUsersDb({ db }) {
  return Object.freeze({
    findByEmail,
    fetchAllRoles,
    fetchAllUsers,
    insert,
    update,
    deleteUser,
  });

  async function updateOtpStatus({ otpStatus, referral, emailId }) {
    // const db = await makeSqliteDb();
    const sql = `UPDATE users SET otp_status = ? , referral = ? WHERE email_id = ? `;
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(sql, [otpStatus, referral, emailId], (err) => {
          if (err) {
            reject(err);
          }
        });
        db.get(
          `SELECT * FROM users WHERE email_id = ?`,
          [emailId],
          (err, row) => {
            if (err) {
              reject(err);
            }
            console.log("result row: ", row, otpStatus, referral, emailId);
            resolve(row);
          }
        );
      });
    });
  }

  async function fetchAllRoles() {
    const sql = "SELECT role_id as id, role_name as value FROM roles;";

    return new Promise((resolve, reject) => {
      db.all(sql, (err, row) => {
        if (err) {
          reject(err);
        }
        console.log("roles result:", row);
        resolve(row);
      });
    });
  }

  async function fetchAllUsers() {
    const sql =
      `SELECT first_name as firstName, last_name as lastName,email_id as emailId, roles.role_name as roleName, role_id as roleId
        FROM users INNER JOIN roles ON roles.role_id = users.role WHERE deleted = 0;`;

    return new Promise((resolve, reject) => {
      db.all(sql, (err, row) => {
        if (err) {
          reject(err);
        }
        console.log("All users result:", row);
        resolve(row);
      });
    });
  }

  async function insert({ emailId, firstName, lastName, role }) {
    console.log("trying to insert in db users table");
    // const db = await makeSqliteDb();
    const sql = `INSERT INTO users (first_name, last_name, email_id, role) VALUES (?,?,?,?) ON CONFLICT(email_id)
     DO UPDATE SET first_name = excluded.first_name, last_name = excluded.last_name, role = excluded.role, deleted = 0`;
    const sqlGet =
      "SELECT * FROM users INNER JOIN roles ON roles.role_id = users.role WHERE email_id = ?";
    console.log("values are", {
      firstName,
      lastName,
      emailId,
      role,
    });

    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(sql, [firstName, lastName, emailId, role], (err, row) => {
          if (err) {
            console.error("insert in user table error", err.message);
            reject(err.message);
          }
          console.log("insert in user table result", row);
        });
        db.get(sqlGet, [emailId], (err, row) => {
          if (err) {
            console.log("get user  after insert error", err);
            reject(err);
          }
          console.log("get user after insert result :", row);

          resolve(row);
        });
      });
    });
  }

  async function update({ firstName, lastName, role, emailId }) {
    console.log("updateUser db", firstName, lastName, role);
    const sql = `UPDATE users SET first_name = ?, last_name = ?, role = ? WHERE email_id = ?`;
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(sql, [firstName, lastName, role, emailId], (err) => {
          if (err) {
            reject(err);
          }
          resolve(true);
        });
      });
    });
  }

  async function deleteUser({ emails }) {
    console.log("deleteUser db", emails);
    const emailsTobeRemoved = emails.join(",");
    let marks= Array(emails.length).fill('?').join(',');
    let values = [1]
    emails.forEach(val=>{
      values.push(val)
    })
    const sql = 'UPDATE users SET deleted = ? WHERE email_id IN ( '+ marks +' );';
    console.log('delete sql:',sql,values)
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(sql, values, (err) => {
          if (err) {
            reject(err);
          }
          resolve(true);
        });
      });
    });
  }

  async function findByEmail({ email }) {
    // const db = await makeSqliteDb();
    console.log("checking email :", email);
    const sql = "SELECT * FROM users WHERE email_id = ?";
    return new Promise((resolve, reject) => {
      db.serialize(() => {
        db.get(sql, [email], (err, row) => {
          if (err) {
            console.log("find by email err :", err);
            reject(err);
          }
          console.log("result for find by email :", row);
          resolve(row);
        });
      });
    });
  }
}
