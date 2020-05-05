export default function makeRemoveUser({ usersDb }) {
  return async function removeUser({ httpRequest }) {
    console.log("printing httprequest", httpRequest.body);
    // const exists = await usersDb.findByEmail({
    //   email: httpRequest.body.emails,
    // });
    // if (!exists) {
    //   return exists;
    // }
    console.log("checking request in remove user usecase :", httpRequest);
   

    return usersDb.deleteUser({
      emails: httpRequest.body.emails,
    });

    
  };
}
