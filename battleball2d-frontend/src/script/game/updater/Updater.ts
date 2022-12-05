class Updater {
  callback: () => void;
  constructor(callback: () => void) {
    this.callback = callback;
  }
};

export default Updater;