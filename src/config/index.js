const config = {
  env: 'dev',
  dev: {
    network: {
      host: 'localhost',
      port: 8545,
      url: 'http://121.196.203.34:8545',
      network_id: '*', // Match any network id
    },
  },
};

export default config[config.env];
