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
        'Delete departments',
        'Update employee roles',
        'Finish'
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
            case 'Add departments':
                addDepartments();
                break;
            case 'Add roles':
                addRoles();
                break;
            case 'Delete departments':
                deleteDepartment();
                break;
            case 'Finish':
                end();
                break;
            default:
                break;
        } 
    })

    // connection.end();
}

const viewDepartment = () => {
    connection.query('SELECT id AS ID, name AS Department FROM department;', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
};

const viewRoles = () => {
    connection.query('SELECT * FROM role;', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const viewEmployees = () => {
    connection.query('SELECT * FROM employee;', (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
    })
}

const addDepartments = () => {
    inquirer
    .prompt({
        type: 'input',
        name: 'addDpt',
        message: 'Which department do you want to add?'
    })
    .then(answer => {
        connection.query(
            `INSERT INTO department (name)
            VALUES ('${answer.addDpt}');`,
            (err, res) => {
                if (err) throw err;
                init();
            }
        )
    })
}

const addRoles = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the new title?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the new salary?'
        },
        {
            type: 'input',
            name: 'deptId',
            message: 'What is the new department ID?'
        }
    ])
    .then(answer => {
        connection.query(
            `INSERT INTO role (title, salary, department_id)
            VALUES ('${answer.title}', '${answer.salary}', '${answer.deptId}');
        `, (err, res) => {
            if (err) throw err;
            init();
        }
        )
        
    })
    
}

const addEmployees = () => {

}

const deleteDepartment = () => {
    connection.query('DELETE FROM department WHERE id > 5;',
        (err, res) => {
            if (err) throw err;
            init();
        }
    )
}

const updateEmployeeRoles = () => {

}

const end = () => {
    connection.end();
}