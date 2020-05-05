import {
  addUser,
  updateUser,
  getRoles,
  allUsers,
  removeUser,
} from "../use-cases";
import makeCreateUser from "./create-user";
import makeEditUser from "./edit-user";
import makeFetchRoles from "./fetch-roles";
import makeFetchUsers from "./fetch-users";
import makeRemoveUsers from "./remove-users";
import notFound from "./not-found";

const createUser = makeCreateUser({
  addUser,
});

const editUser = makeEditUser({
  updateUser,
});

const fetchRoles = makeFetchRoles({
  getRoles,
});

const fetchUsers = makeFetchUsers({ allUsers });

const removeUsers = makeRemoveUsers({ removeUser });

const userController = Object.freeze({
  notFound,
  createUser,
  editUser,
  fetchRoles,
  fetchUsers,
  removeUsers
});

export default userController;
export { notFound, createUser, editUser, fetchRoles, fetchUsers,removeUsers };
