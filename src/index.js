import dva from 'dva';
import './index.css';
import loadContracts from './loadContracts';
import { testContract } from './services/contract.js';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. load contracts and Start
loadContracts(app, window).then(async (result) => {
  await testContract(result);
});
