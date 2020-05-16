const APIServerPort = 3099;
const database = {
    host: 'localhost',
    port: 27017
};

module.exports = {
    database,
    APIServerPort
}

/*
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;
*/