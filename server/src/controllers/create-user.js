export default function makeCreateUser({ addUser }) {
    return async function createUser(httpRequest) {
      const headers = {
        "Content-Type": "application/json"
      };
      try {
        const user = await addUser({ httpRequest });
  
        console.log('add user result in create user controller',user)
      
        if (!user) {
          return {
            headers,
            statusCode: 501,
            body: {
              error: "Unable to create user"
            }
          };
        }
        return {
          headers,
          statusCode: user.id == null ? 404 : 200,
          success: true,
          body: { user , message:'User created succefully' }
        };
      } catch (e) {
        // TODO: Error logging
        console.log('create user controller error',e)
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
  