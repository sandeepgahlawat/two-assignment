import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import {
  notFound,
  createUser,
  editUser,
  fetchRoles,
  fetchUsers,
  removeUsers
} from "./controllers";
import makeCallback from "./express-callback";
import cors from "cors";

dotenv.config();

const apiRoot = "";
const app = express();
app.use(bodyParser.json());

app.use((_, res, next) => {
  res.set({ Tk: "!" });
  next();
});

app.use(cors());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.enable("trust proxy");


app.post(`${apiRoot}/add-user`, makeCallback(createUser));
app.post(`${apiRoot}/edit-user`, makeCallback(editUser));
app.post(`${apiRoot}/remove-user`, makeCallback(removeUsers));
app.get(`${apiRoot}/all-roles`, makeCallback(fetchRoles));
app.get(`${apiRoot}/all-users`, makeCallback(fetchUsers));

app.use(makeCallback(notFound));

// listen for requests
app.listen(8000, () => {
  console.log("Server is listening on port 8000");
});

export default app;
