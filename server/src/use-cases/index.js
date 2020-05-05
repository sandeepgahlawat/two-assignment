import makeAddUser from "./add-user";
import makeUpdateUser from "./update-user";
import makeGetRoles  from "./get-roles"
import makeAllUsers from "./all-users";
import makeRemoveUser from './remove-user'

import usersDb from "../data-access";


const addUser = makeAddUser({ usersDb});
const updateUser = makeUpdateUser({usersDb})
const getRoles = makeGetRoles({usersDb});
const allUsers = makeAllUsers({usersDb});
const removeUser = makeRemoveUser({usersDb});

const userService = Object.freeze({
  addUser,
  updateUser,
  getRoles,
  allUsers,
  removeUser
 
});

export default userService;
export {
  addUser,
  updateUser,
  getRoles,
  allUsers,
  removeUser
};
