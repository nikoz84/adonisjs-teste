//import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ConteudosController {
  public async index({ request, response }) {
    let limit = request.input('limit', 30)
    let page = request.input('page', 1)
    const actors = await Database.from('actor').select('*').paginate(page, limit)
    return response.send(actors)
  }

  public async create({ response }) {
    const data = { first_name: 'dfdsdf', last_name: 'Romero' }
    const newActor = await Database.table('actor')
      .insert(data)
      .returning(['actor_id', 'first_name', 'last_name'])
    if (!newActor) {
      return response.send({ mensage: 'Não foi possível criar o ator' })
    }

    return response.send({ newActor })
  }
}
