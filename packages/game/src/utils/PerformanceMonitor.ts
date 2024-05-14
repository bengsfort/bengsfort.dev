const MAX_BUFFER_SIZE = 100;

interface PerfStats {
  averageFrameTime: number;
  maxFrameTime: number;
  averageRenderTime: number;
  maxRenderTime: number;
  maxMemUsage: number;
  averageMemUsage: number;
  maxHeapSize: number;
  averageHeapSize: number;
}

export class PerformanceMonitor {
  #stats: PerfStats = {
    averageFrameTime: 0,
    maxFrameTime: 0,
    averageRenderTime: 0,
    maxRenderTime: 0,
    maxMemUsage: 0,
    averageMemUsage: 0,
    maxHeapSize: 0,
    averageHeapSize: 0,
  };

  #frameTimeBuffer: number[] = [];
  #renderTimeBuffer: number[] = [];
  #memUsageBuffer: number[] = [];
  #heapSizeBuffer: number[] = [];

  #frameStartTime = 0;
  #renderStartTime = 0;

  public get stats(): PerfStats {
    return this.#stats;
  }

  public frameStart(): void {
    this.#frameStartTime = performance.now();
    performance.mark('frame-start');
  }

  public frameEnd(): void {
    performance.mark('frame-end');
    const frameTime = performance.now() - this.#frameStartTime;
    this.#frameTimeBuffer.push(frameTime);

    if (frameTime > this.#stats.maxFrameTime) {
      this.#stats.maxFrameTime = frameTime;
    }

    const bufferSize = this.#frameTimeBuffer.length;
    if (bufferSize < MAX_BUFFER_SIZE) {
      return;
    }

    // Zero out buffer and average
    const buffer = this.#frameTimeBuffer.splice(0, bufferSize);
    if (this.#stats.averageFrameTime !== 0) {
      buffer.push(this.#stats.averageFrameTime);
    }

    this.#stats.averageFrameTime = this.#getAverage(buffer);
  }

  public renderStart(): void {
    this.#renderStartTime = performance.now();
    performance.mark('render-start');
  }

  public renderEnd(): void {
    performance.mark('render-end');
    const renderTime = performance.now() - this.#renderStartTime;
    this.#renderTimeBuffer.push(renderTime);

    if (renderTime > this.#stats.maxRenderTime) {
      this.#stats.maxRenderTime = renderTime;
    }

    const bufferSize = this.#renderTimeBuffer.length;
    if (bufferSize < MAX_BUFFER_SIZE) {
      return;
    }

    // Zero out buffer and average
    const buffer = this.#renderTimeBuffer.splice(0, bufferSize);
    if (this.#stats.averageRenderTime !== 0) {
      buffer.push(this.#stats.averageRenderTime);
    }

    this.#stats.averageRenderTime = this.#getAverage(buffer);
  }

  public captureMemory(): void {
    const { usedJSHeapSize, totalJSHeapSize } = performance.memory;
    this.#memUsageBuffer.push(usedJSHeapSize);
    this.#heapSizeBuffer.push(totalJSHeapSize);

    this.#stats.maxMemUsage = Math.max(usedJSHeapSize, this.#stats.maxMemUsage);
    this.#stats.maxHeapSize = Math.max(totalJSHeapSize, this.#stats.maxHeapSize);

    if (this.#memUsageBuffer.length >= MAX_BUFFER_SIZE) {
      const memBuffer = this.#memUsageBuffer.splice(0, this.#memUsageBuffer.length);
      if (this.#stats.averageMemUsage < 0) {
        memBuffer.push(this.#stats.averageMemUsage);
      }
      this.#stats.averageMemUsage = this.#getAverage(memBuffer);
    }

    if (this.#heapSizeBuffer.length >= MAX_BUFFER_SIZE) {
      const heapBuffer = this.#heapSizeBuffer.splice(0, this.#heapSizeBuffer.length);
      if (this.#stats.averageHeapSize < 0) {
        heapBuffer.push(this.#stats.averageHeapSize);
      }
      this.#stats.averageHeapSize = this.#getAverage(heapBuffer);
    }
  }

  #getAverage(buffer: number[]): number {
    let total = 0;
    for (let i = 0; i < buffer.length; i++) {
      total += buffer[i];
    }
    return total / buffer.length;
  }
}
