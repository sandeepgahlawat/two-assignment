export default function buildMakeUser({ Id, validateEmail }) {
  return function makeUser({
    firstName = "",
    lastName = "",
    role,
    email,
    createdOn = Date.now(),
    id = Id.makeId(),
    modifiedOn = Date.now(),
  } = {}) {
    if (!Id.isValidId(id)) {
      throw new Error("User must have a valid id.");
    }

    if (!email || !validateEmail(email)) {
      throw new Error("User should have a valid email id");
    }

    return Object.freeze({
      getCreatedOn: () => createdOn,
      getId: () => id,
      getModifiedOn: () => modifiedOn,
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getEmailId: () => email,
      getRole:()=>role,
      setRole: roleId => {
        role = roleId;
      }
    });
  };
}
