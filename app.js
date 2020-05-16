const routes = require('./routes');
const settings = require('./settings');
const middlewares = require('./middlewares');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const express = require('express');
const router = express.Router();
const app = express();
const mongo = require('mongodb').MongoClient;
const mongo_uri = `mongodb://${settings.database.host}:${settings.database.port}`;
const cors = require('cors');
app.use(cors());
 
router.get('/employees', routes.employees.listAllEmployees);
router.get('/employees/:id', middlewares.ConvertToObjectID,routes.employees.listOneEmployee);
router.post('/employees', jsonParser, routes.employees.createEmployee);
router.patch('/employees/:id', jsonParser, middlewares.ConvertToObjectID, routes.employees.updateEmployee);
router.delete('/employees/:id', middlewares.ConvertToObjectID, routes.employees.deleteEmployee);

router.get('/departments', routes.departments.listAllDepartments);
router.get('/departments/:deptName/employees', routes.departments.getDepartmentEmployees);

app.use('/api', router);

mongo.connect(mongo_uri, { useNewUrlParser: true })
.then(client => {
  const db = client.db('project');
  const collection = db.collection('employees');
  app.locals.collection = collection;
  app.listen(settings.APIServerPort, () => console.info(`Server is listening on ${settings.APIServerPort}.`));
}).catch(error => console.error(error));
