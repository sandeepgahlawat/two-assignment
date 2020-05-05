import makeUser from "../user";
export default function makeAddUser({ usersDb, bcrypt }) {
  return async function addUser({ httpRequest }) {
    console.log("printing httprequest", httpRequest.body);
    const exists = await usersDb.findByEmail({
      emailId: httpRequest.body.emailId
    });
    if (exists) {
      return exists;
    }
    console.log("checking auth user :",httpRequest);
    const user = makeUser({
      email: httpRequest.body.emailId,
      role: httpRequest.body.role,
      firstName: httpRequest.body.firstName,
      lastName: httpRequest.body.lastName
    });
  
    console.log("add user-makeuser-result :", user);
    return usersDb.insert({
      createdOn: user.getCreatedOn(),
      id: user.getId(),
      modifiedOn: user.getModifiedOn(),
      emailId: user.getEmailId(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      role: user.getRole()
    });
  };
}
