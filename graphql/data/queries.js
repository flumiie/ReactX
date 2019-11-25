import { _fetch } from './schema'

export async function fetchRockets(relativeURL)
{
  return _fetch(relativeURL)
    .then(json => json.rockets)
}