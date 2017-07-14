module.exports = {
  env: 'development',
  networks: {
    development: {
      url: 'http://121.196.203.34:8545',
      host: '121.196.203.34',
      port: 8545,
      network_id: '*', // Match any network id
    },
  },
  contracts: {
    MetaCoin: true,
  },
};

// export default config[config.env];
