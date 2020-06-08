const base = 'http://localhost:3099/api';
const fetch = require('node-fetch');

module.exports = {
    Query: {
        department: async (parent, { deptName }) => {
            return await fetch(`${base}/departments/${deptName}/employees`).then(response => response.json());
        }
    },
    Department: {
        employees: async parent => { 
            for (let i = 0; i < parent.length; i++) {
                let deptName = parent[i].department.name;
                return await fetch(`${base}/departments/${deptName}/employees`).then(response => response.json());
            }
        }
    }
}