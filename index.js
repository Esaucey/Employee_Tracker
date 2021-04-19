const mysql = require('mysql');
const inquirer = require('inquirer');

let roleStore = [];
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
        'Delete roles',
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
            case 'Add employees':
                addEmployees();
                break;
            case 'Finish':
                end();
                break;
            default:
                break;
        } 
    })
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
            let answerRole = [answer.title, answer.salary, answer.deptId];
            roleStore.push(answerRole);
            console.log(roleStore);
            init();
        }
        )
    })
}

const addEmployees = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the new employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the new employee's last name?"
        },
        {
            type: 'input',
            name: 'roleId',
            message: "What is the new employee's role ID?"
        },
        {
            type: 'input',
            name: 'managerId',
            message: "What is the manager ID for the new employee?"
        }
    ])
    .then(answer => {
        connection.query(`INSERT INTO employee SET ?`, {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleId,
            manager_id: answer.managerId
        }
        , (err, res) => {
            if (err) throw err;
            init();
        })
    })
}

const end = () => {
    connection.end();
}