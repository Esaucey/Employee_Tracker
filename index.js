const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: 'eric9421',
    database: 'employeeTracker_DB',
  });

connection.connect((err) => {
    if (err) throw err;
    init();
});

const init = () => {
    inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
        'View departments',
        'View roles',
        'View employees',
        'Add departments',
        'Add roles',
        'Add employees',
        'Update employee roles'
      ],
    })
    .then(answer => {
        switch (answer.action) {
            case 'View departments':
                viewDepartment();
                break;
            case 'View roles':
                viewRoles();
                break;
            case 'View employees':
                viewEmployees();
            default:
                break;
        } 
    })

    // connection.end();
}

const viewDepartment = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
    })
};

const viewRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
    })
}

const viewEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
    })
}

const addDepartments = () => {

}

const addRoles = () => {

}

const addEmployees = () => {

}

const updateEmployeeRoles = () => {

}