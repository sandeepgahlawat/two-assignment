import makeUser from "../user";
export default function makeUpdateUser({ usersDb }) {
  return async function updateUser({ httpRequest }) {
    console.log("printing httprequest", httpRequest.body);
    const exists = await usersDb.findByEmail({
      email: httpRequest.body.emailId,
    });
    if (!exists) {
      return exists;
    }
    console.log("checking request in update user usecase :", httpRequest);
    const user = makeUser({
      role: httpRequest.body.role,
      firstName: httpRequest.body.firstName,
      lastName: httpRequest.body.lastName,
      email: httpRequest.body.emailId,
    });

    console.log("add user-updateUser-result :", user);
    const isUserUpdated = await usersDb.update({
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      role: user.getRole(),
      emailId: user.getEmailId(),
    });

    if (isUserUpdated) {
      return usersDb.findByEmail({ email: user.getEmailId() });
    }else{
        return Promise.resolve(false);
    }
  };
}
