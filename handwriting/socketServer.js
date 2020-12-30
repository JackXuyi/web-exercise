const http = require('http')
const crypto = require('crypto')
const EventEmitter = require('events')

/**
 * 
 
  1               2               3               4
  0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7 0 1 2 3 4 5 6 7
 +-+-+-+-+-------+-+-------------+-------------------------------+
 |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
 |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
 |N|V|V|V|       |S|             |   (if payload len==126/127)   |
 | |1|2|3|       |K|             |                               |
 +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
 |     Extended payload length continued, if payload len == 127  |
 + - - - - - - - - - - - - - - - +-------------------------------+
 |                               |Masking-key, if MASK set to 1  |
 +-------------------------------+-------------------------------+
 | Masking-key (continued)       |          Payload Data         |
 +-------------------------------- - - - - - - - - - - - - - - - +
 :                     Payload Data continued ...                :
 + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
 |                     Payload Data continued ...                |
 +---------------------------------------------------------------+
 */

class CustomReadSocket extends EventEmitter {
  static MAGIC_STRING = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'

  constructor(req, socket, head) {
    super()
    // 保存上下文信息
    this.req = req
    this.socket = socket
    this.head = head

    // 内部状态
    this.dataType = ''
    this.resHeaders = this.buildHeaders(req.headers['sec-websocket-key'])
    this.buffer = null

    // 接收数据
    this.socket.on('data', this.handleData)

    // 响应给客户端
    this.socket.write(this.resHeaders)
  }

  // 构建响应头
  buildHeaders(secWebsocketKey) {
    // 计算返回的key
    const resKey = crypto
      .createHash('sha1')
      .update(secWebsocketKey + CustomReadSocket.MAGIC_STRING)
      .digest('base64')

    // 构造响应头
    return [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      'Sec-WebSocket-Accept: ' + resKey,
    ]
      .concat('', '')
      .join('\r\n')
  }

  // 处理收到的数据
  handleData = (data) => {
    do {
      const type = this.getFrameType(data[0])
      if (type && type !== 'continue') {
        this.dataType = type
      }
      if (type === 'continue' || type === 'text' || type === 'binary') {
        let maskLen = 0
        if (this.hasMask(data[1])) {
          maskLen = 4
        }
        const [start, len] = this.getFrameDataLength(data)

        this.getDataFromFrame(
          data.slice(start + maskLen),
          data.slice(start, start + maskLen)
        )
      }
    } while (!this.isLastFrame(data[0]))
    this.handleAllType(this.dataType)
  }

  // 获取当前帧类型
  getFrameType(byte) {
    const realType = byte & 0x7f
    if (!realType) {
      // 代表连续的帧
      return 'continue'
    } else if (realType === 0x01) {
      return 'text'
    } else if (realType === 0x09) {
      return 'ping'
    } else if (realType === 0x0a) {
      return 'pong'
    } else if (realType === 0x02) {
      return 'binary'
    } else if (realType === 0x08) {
      return 'close'
    } else {
      return ''
    }
  }

  // 处理所有帧类型
  handleAllType(type) {
    switch (type) {
      case 'continue': {
        console.log('continue')
        break
      }
      case 'text': {
        this.emit('message', this.buffer.toString())
        break
      }
      case 'binary': {
        this.emit('message', this.buffer)
        break
      }
      case 'close': {
        this.emit('close')
        break
      }
      case 'ping': {
        this.emit('ping')
        break
      }
      case 'pong': {
        this.emit('pong')
        break
      }
      default: {
        console.log('others')
      }
    }
    // 释放 buffer 和重置数据类型
    this.buffer = null
    this.dataType = ''
  }

  // 判断是否是最后一个帧
  isLastFrame(byte) {
    return !!(byte & 0x80)
  }

  // 提取帧的长度
  getFrameDataLength(buffer) {
    // 第二个字节的底 7 位
    const firtLen = buffer[1] & 0x7f
    if (firtLen < 125) {
      return [2, firtLen]
    } else if (firtLen === 126) {
      const len = buffer.readUInt16BE(2)
      return [4, len]
    } else {
      const len = buffer.readUInt64BE(2)
      return [10, len]
    }
  }

  // 判断是否有掩码
  hasMask(byte) {
    return !!(0x80 & byte)
  }

  // 从帧里提取数据
  getDataFromFrame(buffer, maskBuffer) {
    if (buffer && buffer.length) {
      const len = buffer.length
      if (maskBuffer && maskBuffer.length === 4) {
        for (let i = 0; i < len; i++) {
          buffer[i] = buffer[i] ^ maskBuffer[i % 4]
        }
      }
      this.buffer = this.buffer ? Buffer.concat([this.buffer, buffer]) : buffer
    }
  }
}

class CustomWebsocket extends CustomReadSocket {
  timer = null
  constructor(req, socket, head, options) {
    super(req, socket, head)
    this.options = options

    this.timeout()
    this.socket.on('data', () => {
      this.timeout()
    })
  }

  send(message) {
    const buffer = Buffer.from(message)
    const list = this.buildDataFrameList('text', buffer)
    list.forEach((frame) => {
      this.socket.write(frame)
    })
    this.timeout()
  }

  ping() {
    const frame = this.buildFrame('ping')
    this.socket.write(frame)
    this.timeout()
  }

  pong() {
    const frame = this.buildFrame('pong')
    this.socket.write(frame)
    this.timeout()
  }

  close() {
    const frame = this.buildFrame('close')
    this.socket.write(frame)
    this.socket.end()
    process.nextTick(() => {
      this.socket.destroy()
    })
  }

  timeout() {
    const { timeout = 10000 } = this.options || {}
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.ping()
    }, timeout)
  }

  buildDataFrameList(type, buffer) {
    const bufferList = []
    let tempBuffer = buffer
    while (tempBuffer.length) {
      bufferList.push(tempBuffer.slice(0, this.MAX_FRAME_SIZE))
      tempBuffer = tempBuffer.slice(this.MAX_FRAME_SIZE)
    }
    const len = bufferList.length
    return bufferList.map((buf, index) =>
      this.buildFrame(index ? 'continue' : type, len === index + 1, buf)
    )
  }

  buildFrame(dataType, isLast = true, buffer = null) {
    let firstByte = isLast ? 0x80 : 0x00
    switch (`${dataType || ''}`.toLowerCase()) {
      case 'continue': {
        firstByte = firstByte | 0x00
        break
      }
      case 'text': {
        firstByte = firstByte | 0x01
        break
      }
      case 'binary': {
        firstByte = firstByte | 0x02
        break
      }
      case 'close': {
        firstByte = firstByte | 0x08
        break
      }
      case 'ping': {
        firstByte = firstByte | 0x09
        break
      }
      case 'pong': {
        firstByte = firstByte | 0x0a
        break
      }
      default: {
        console.log('others')
      }
    }
    let secondByte = 0x00

    if (buffer && buffer.length) {
      const lenByteList = []
      const len = buffer.length
      if (len <= 125) {
        secondByte = secondByte | len
      } else if (len >= 126 && len < 65536) {
        secondByte = secondByte | 0x7e
        for (let i = 0; i < 2; i++) {
          lenByteList.push(0xff & (len >> (i * 8)))
        }
      } else {
        secondByte = secondByte | 0x7f
        for (let i = 0; i < 8; i++) {
          lenByteList.push(0xff & (len >> (i * 8)))
        }
      }
      lenByteList.reverse()
      const prefixBuffer = Buffer.from([firstByte, secondByte, ...lenByteList])
      return Buffer.concat([prefixBuffer, buffer])
    }
    return Buffer.from([firstByte, secondByte])
  }
}

function wrapperWebsocket(server, cb) {
  // Upgrade请求处理
  server.on('upgrade', (req, socket, head) => {
    const ws = new CustomWebsocket(req, socket, head)
    cb && cb(ws)
  })
}

const server = http.createServer((req, res) => {
  res.end('websocket test')
})

wrapperWebsocket(server, (ws) => {
  ws.on('message', (data) => {
    console.log('message', data)
  })

  ws.on('ping', () => {
    console.log('len', data)
    ws.pong()
  })

  ws.on('pong', () => {
    console.log('pong')
  })

  ws.on('close', () => {
    console.log('close')
    ws.close()
  })

  ws.on('error', (e) => {
    console.log('error', e)
  })
})

server.listen(8000, () => {
  console.log('server listen on http://localhost:8000')
})
