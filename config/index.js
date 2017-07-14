module.exports = {
  env: 'development',
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // Match any network id
    },
  },
  contracts: {
    MetaCoin: true,
  },
};

// export default config[config.env];
