import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import routes from './api/index'

const app = new Koa()

app.use(bodyParser())

app.use(routes.routes())
app.use(routes.allowedMethods())

app.listen(3210)

export default app
