const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 8080;

const allowAccessMiddleware = (_, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://chopperflix.vercel.app/',
  );
  next();
};

server.use(allowAccessMiddleware);
server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running in port ${port}`);
});
