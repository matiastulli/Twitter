import dotenv from 'dotenv';
import Server from './models/Server.js';


dotenv.config();

const App = new Server();

App.listen();
