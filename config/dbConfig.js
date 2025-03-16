module.exports = {
    HOST: "127.0.0.1",
    USER: "Livingstone",
    PASSWORD: "Quantum@1121",
    DB: "Nelson",
    dialect: "mysql",
    pool: {
        max: 5000,
        min: 0,
        acquire: 3000,
        idle:1000
    }
};
