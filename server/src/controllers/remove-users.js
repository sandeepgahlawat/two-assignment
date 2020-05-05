export default function makeRemoveUsers({ removeUser }) {
  return async function removeUsers(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const isRemoved = await removeUser({ httpRequest });

      console.log("remove user controller", isRemoved);

      if (!isRemoved) {
        return {
          headers,
          statusCode: 501,
          body: {
            error: "Unable to remove user",
          },
        };
      }
      return {
        headers,
        statusCode: isRemoved ? 200 : 404,
        success: true,
        body: { message: "User removed succefully" },
      };
    } catch (e) {
      // TODO: Error logging
      console.log("remove user controller error", e);
      return {
        headers,
        statusCode: 400,
        body: {
          error: e,
        },
      };
    }
  };
}
