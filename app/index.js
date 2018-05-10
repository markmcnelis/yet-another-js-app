import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors';
import routes from './api/index'

const app = new Koa()

app.use(cors());
app.use(bodyParser())

app.use(routes.routes())
app.use(routes.allowedMethods())

app.listen(3210)

export default app
