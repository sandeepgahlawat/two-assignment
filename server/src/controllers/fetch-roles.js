export default function makeFetchRoles({ getRoles }) {
    return async function fetchRolesr(httpRequest) {
      const headers = {
        "Content-Type": "application/json"
      };
      try {
        const roles = await getRoles({ httpRequest });
  
        console.log('fetch roles controller result:',roles)
      
        if (!roles) {
          return {
            headers,
            statusCode: 501,
            body: {
              error: "Unable to fetch roles"
            }
          };
        }
        return {
          headers,
          statusCode: roles == null ? 404 : 200,
          success: true,
          body: { roles , message:'Roles found' }
        };
      } catch (e) {
        // TODO: Error logging
        console.log('fetch roles error',e)
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
  