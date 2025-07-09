module.exports = {
    apps: [
        {
            name: "ecommerce-backend",
            script: "dist/index.js",
            instances: "max",
            exec_mode: "cluster",
            env: {
                NODE_ENV: "development",
                PORT: 5000,
            },
            env_production: {
                NODE_ENV: "production",
                PORT: 5000,
            },
            error_file: "./logs/err.log",
            out_file: "./logs/out.log",
            log_file: "./logs/combined.log",
            time: true,
            max_memory_restart: "500M",
            node_args: "--max_old_space_size=1024",
        },
    ],
};
