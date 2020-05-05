import makeUsersDb from "./users-db";
import sqlite3 from "sqlite3";
import path, { dirname } from 'path';


const sqlite = sqlite3.verbose();

let db = new sqlite.Database('../../users.db', (err) => {
  if (err) {
    return console.error('error while opening database',err.message);
  }
  console.log("Connected to the in-memory'' SQlite database.");
});

export async function makeSqliteDb() {
  console.log("inside making db");

  const dropUsersTable = "DROP TABLE users;";
  const dropRolesTable = "DROP TABLE roles;";

  const userTable = `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT,
      email_id CHAR(50) NOT NULL UNIQUE,
      role INTEGER NOT NULL,
      deleted INTEGER NOT NULL DEFAULT 0,
      created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;

  const rolesTable = `CREATE TABLE roles (id INTEGER PRIMARY KEY NOT NULL,
        role_id INTEGER NOT NULL UNIQUE,
        role_name TEXT,
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`;
  try {
    console.log(db)
     const isUserTableCreated = await new Promise((resolve, reject) => {
      db.serialize(() => {
        // db.run("DROP TABLE users");
        db.run(dropUsersTable);
            
        db.run(userTable, (err) => {
          if (!err) {
            console.log("user table created");
            resolve(true);
          }
          console.log("user table creation error: ", err);
          reject(err);
        });  
        
      });
    });

   const isRolesTableCreated =  await new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run(dropRolesTable);
        db.run(rolesTable, (err) => {
          if (!err) {
            console.log("roles table created");
            resolve(true);
          }
          console.log("roles table creation error: ", err);
          reject(err);
        });
       
        
      });
    });

    const insertRoles =  await new Promise((resolve, reject) => {
      db.serialize(() => {
        db.run("INSERT INTO roles (role_id,role_name) VALUES (1,'Admin'),(2,'Guest'),(3,'Super User'),(4,'Member'),(5,'Developer');",(err)=>{
          console.log('inserting into roles result:',err);
          resolve()
        });    
      });
    });

    return db;
  } catch (e) {
    console.log("create table error: ", e);
    // throw new Error("unable to create tables");
  }
}

const usersDb = makeUsersDb({ db });
export default usersDb;
