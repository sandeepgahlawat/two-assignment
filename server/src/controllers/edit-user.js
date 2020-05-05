export default function makeEditUser({ updateUser }) {
    return async function editUser(httpRequest) {
      const headers = {
        "Content-Type": "application/json"
      };
      try {
        const user = await updateUser({ httpRequest });
  
        console.log('add user result in edit user controller',user)
      
        if (!user) {
          return {
            headers,
            statusCode: 501,
            body: {
              error: "Unable to edit user"
            }
          };
        }
        return {
          headers,
          statusCode: user.id == null ? 404 : 200,
          success: true,
          body: { user , message:'User edited succefully' }
        };
      } catch (e) {
        // TODO: Error logging
        console.log('edit user controller error',e)
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
  