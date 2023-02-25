const express = require('express');
const { boomErrorHandler, errorHandler, logErrors } = require('./middleWares/error.handler');
const routersApi = require('./routes')
const app = express();
const port = 3021;

app.use(express.json())

app.get('/',(req, res)=>{
  res.writeHead(200,{'Content-Type':'html'})
  res.write('<div>Hello World</div>')
  res.end()
})

routersApi(app)

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, ()=>{
  // eslint-disable-next-line no-console
  console.log(`Server up and listening on port ${port}`)
})
