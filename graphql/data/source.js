import { RESTDataSource } from 'apollo-datasource-rest'

export const API_URL = 'https://api.spacexdata.com/v3/'

export class SpaceXAPI extends RESTDataSource
{
  constructor()
  {
    super()
    this.baseURL = API_URL
  }

  async getRockets()
  {
    return this.get('rockets')
  }

  async getRocket(id)
  {
    const res = await this.get('rocket', { id })
    return res[0]
  }
}