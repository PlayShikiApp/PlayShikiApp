import uEvent from 'uevent';

export default class StaticLoader {
  FETCH_EVENT = 'loader:fetch';

  constructor(batchSize, cache) {
    this.batchSize = batchSize;
    this.cache = cache;

    uEvent.mixin(this);

    this._initialize();
  }

  // public methods
  _initialize() {
  }

  fetch() {
    return this._returnFromCache();
  }

  isFinished() {
    return this.cache.length === 0;
  }

  // private methods
  _returnFromCache() {
    return this.trigger(this.FETCH_EVENT, this.cache.splice(0, this.batchSize));
  }
}
