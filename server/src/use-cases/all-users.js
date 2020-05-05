export default function makeAllUsers({ usersDb }) {
    return async function allUsers({ httpRequest }) {
      console.log("printing httprequest", httpRequest.body);
      return usersDb.fetchAllUsers();
    };
  }
  