import dotenv from 'dotenv';
import Server from './models/serverModel.js';

dotenv.config();

const App = new Server();

App.listen();
