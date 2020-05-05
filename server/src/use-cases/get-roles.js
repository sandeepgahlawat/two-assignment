export default function makeGetRoles({ usersDb }) {
  return async function getRoles({ httpRequest }) {
    console.log("printing httprequest", httpRequest.body);
    return usersDb.fetchAllRoles();
  };
}
