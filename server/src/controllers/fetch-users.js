export default function makeFetchUsers({ allUsers }) {
    return async function fetchUsers(httpRequest) {
      const headers = {
        "Content-Type": "application/json"
      };
      try {
        const users = await allUsers({ httpRequest });
  
        console.log('fetch users controller result:',users)
      
        if (!users) {
          return {
            headers,
            statusCode: 501,
            body: {
              error: "Unable to fetch users"
            }
          };
        }
        return {
          headers,
          statusCode: users == null ? 404 : 200,
          success: true,
          body: { users , message:'Users Found' }
        };
      } catch (e) {
        // TODO: Error logging
        console.log('fetch users error',e)
        return {
          headers,
          statusCode: 400,
          body: {
            error: e
          }
        };
      }
    };
  }
  