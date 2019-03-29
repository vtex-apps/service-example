export default class InvalidStatus extends Error {
  public code = 'InvalidStatus'
  public status = 400

  constructor () {
    super(`The requested status is invalid`)
  }
}
