import config from '../config';

const result = config;
result.networks = config.networks[config.env];
export default result;
