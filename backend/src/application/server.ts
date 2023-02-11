import app from './app';
import 'dotenv/config';
import connection from '../infrastructure/utils/Connection';

const PORT = process.env.APP_PORT || 3001;
connection.getConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    })