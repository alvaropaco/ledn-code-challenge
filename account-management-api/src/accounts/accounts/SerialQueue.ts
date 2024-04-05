export class SerialQueue {
  queue: Promise<void>;
  constructor() {
    this.queue = Promise.resolve();
  }

  add(task) {
    this.queue = this.queue.then(
      () =>
        new Promise(async (resolve) => {
          await task();
          resolve();
        }),
    );
  }
}
