let ioInstance;

// io 객체를 초기화하는 함수
export function init(io) {
  ioInstance = io;
}

// 초기화된 io 객체를 반환하는 함수
export function getIo() {
  if (!ioInstance) {
    throw new Error('Socket.IO is not initialized!');
  }
  return ioInstance;
}