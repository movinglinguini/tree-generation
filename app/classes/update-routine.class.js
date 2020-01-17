export class UpdateRoutine {
  constructor(params, routine) {
    this._routine = null;
    this._params = [];

    this.setParamsFromList(params);
    this.setRoutine(routine);

    this.setParam('elapsedTime', 0);
  }

  getParamValue(key) {
    return this._params[key];
  }

  setParamsFromList(params) {
    if (!params) { return null; }
    Object.keys(params)
      .forEach(pk => this.setParam(pk, params[pk]));
  }

  setParam(key, value, operation = '=') {
    switch(operation) {
      case '+=':
        this._params[key] += value;
      break;
      case '-=':
        this._params[key] -= value;
      break;
      case '*=':
        this._params[key] *= value;
      break;
      case '/=':
        this._params[key] /= value;
      break;
      case '=':
      default: this._params[key] = value;
    }
  }

  setRoutine(routine) {
    if (!routine) { return null; }
    this._routine = routine.bind(this);
  }

  doRoutine(delta) {
    if (!this._routine) {
      return;
    }
    this._routine(delta);
  }
}