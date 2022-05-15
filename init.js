import app from './app';
import './src/db';
import './src/models/Video';
import './src/models/User';
const PORT = 4000;

const handleListening = () => console.log(`Listneig on : http://localhost:${PORT}`);

app.listen(PORT, handleListening);
