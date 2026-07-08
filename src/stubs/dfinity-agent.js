export class HttpAgent {
  constructor() {}
  fetchRootKey() { return Promise.resolve() }
  call() { return Promise.resolve({}) }
  query() { return Promise.resolve({}) }
  getPrincipal() { return { toText: () => 'aaaaa-aa', isAnonymous: () => true } }
  createActor() { return null }
}
export const Actor = {
  createActor: (idlFactory, options) => null,
  actorConstructor: (idlFactory) => null,
}
export const ActorMethod = (_, f) => f
