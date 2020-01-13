const { createServer } = require('http');
const next = require('next');

const port = parseInt(process.env.CARDIOCALC_WEBAPP_PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    createServer(handler).listen(port, error => {
        if (error) throw error;
        console.log(`App ready on http://localhost:${port}`);
    });
}).catch(error => {
    console.error(error.stack);
    process.exit(1);
});
