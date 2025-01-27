const inquirer = require('inquirer');
const { loadQuery, executeQuery, client } = require('./db/queries');

console.log("Starting Employee Tracker CMS...");

const mainMenu = () => {
  console.log("Displaying main menu...");
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View Departments',
        'View Roles',
        'View Employees',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Exit'
      ]
    }
  ]).then(answer => {
    console.log("User selected:", answer.action);
    switch (answer.action) {
      case 'View Departments':
        viewDepartments();
        break;
      case 'View Roles':
        viewRoles();
        break;
      case 'View Employees':
        viewEmployees();
        break;
      case 'Add Department':
        addDepartment();
        break;
      case 'Add Role':
        addRole();
        break;
      case 'Add Employee':
        addEmployee();
        break;
      case 'Update Employee Role':
        updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Goodbye!');
        client.end();
        process.exit();
    }
  });
};

const viewDepartments = () => {
  const query = loadQuery('query.sql').split('-- Query to view all departments')[1].split('--')[0].trim();
  executeQuery(query).then(res => {
    console.table(res.rows);
    mainMenu();
  }).catch(err => console.error(err));
};

const viewRoles = () => {
  const query = loadQuery('query.sql').split('-- Query to view all roles')[1].split('--')[0].trim();
  executeQuery(query).then(res => {
    console.table(res.rows);
    mainMenu();
  }).catch(err => console.error(err));
};

const viewEmployees = () => {
  const query = loadQuery('query.sql').split('-- Query to view all employees')[1].split('--')[0].trim();
  executeQuery(query).then(res => {
    console.table(res.rows);
    mainMenu();
  }).catch(err => console.error(err));
};

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:'
    }
  ]).then(answer => {
    const query = loadQuery('query.sql').split('-- Query to add a new department')[1].split('--')[0].trim();
    executeQuery(query, [answer.name]).then(() => {
      console.log('Department added successfully!');
      mainMenu();
    }).catch(err => console.error(err));
  });
};

const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary of the role:'
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the department ID for the role:'
    }
  ]).then(answer => {
    const query = loadQuery('query.sql').split('-- Query to add a new role')[1].split('--')[0].trim();
    executeQuery(query, [answer.title, answer.salary, answer.department_id]).then(() => {
      console.log('Role added successfully!');
      mainMenu();
    }).catch(err => console.error(err));
  });
};

const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:'
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the role ID for the employee:'
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the manager ID for the employee (if any):'
    }
  ]).then(answer => {
    const query = loadQuery('query.sql').split('-- Query to add a new employee')[1].split('--')[0].trim();
    executeQuery(query, [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]).then(() => {
      console.log('Employee added successfully!');
      mainMenu();
    }).catch(err => console.error(err));
  });
};

const updateEmployeeRole = () => {
  // Fetch all employees and roles to provide choices in the prompt
  const employeeQuery = loadQuery('query.sql').split('-- Query to view all employees')[1].split('--')[0].trim();
  const roleQuery = loadQuery('query.sql').split('-- Query to view all roles')[1].split('--')[0].trim();

  Promise.all([executeQuery(employeeQuery), executeQuery(roleQuery)])
    .then(([employeeRes, roleRes]) => {
      const employees = employeeRes.rows.map(employee => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }));
      const roles = roleRes.rows.map(role => ({
        name: role.title,
        value: role.id
      }));

      inquirer.prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: 'Select the employee whose role you want to update:',
          choices: employees
        },
        {
          type: 'list',
          name: 'new_role_id',
          message: 'Select the new role for the employee:',
          choices: roles
        }
      ]).then(answer => {
        const query = loadQuery('query.sql').split('-- Query to update an employee\'s role')[1].split('--')[0].trim();
        executeQuery(query, [answer.new_role_id, answer.employee_id]).then(() => {
          console.log('Employee role updated successfully!');
          mainMenu();
        }).catch(err => console.error(err));
      });
    })
    .catch(err => console.error(err));
};

mainMenu();