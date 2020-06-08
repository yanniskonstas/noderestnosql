const base = 'http://localhost:3099/api';
const fetch = require('node-fetch');

module.exports = {
    Query: {
        employees: async () => {
            //call /api/employees
            //HTTP, axios, request, node-fetch (Fetch API)
            return await fetch(`${base}/employees`).then(response => response.json());
        },
        employee: async (parent, { _id }, context ) => {
            return await fetch(`${base}/employees/${_id}`, {
                method: 'GET',
                headers : {
                    Authorization : context.authHeader
                }
            }).then(response => response.json());
        }
    }
}