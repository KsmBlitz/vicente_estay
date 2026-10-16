// Permite importar los .yml de /content desde TypeScript (los tipa useContent).
declare module '*.yml' {
  const data: unknown
  export default data
}
