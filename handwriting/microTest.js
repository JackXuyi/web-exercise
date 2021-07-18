const MAX_TIMES = 1000;



function timeoutWrapper() {
    let lastTimestamp = Date.now()
    let times = 0
    function test(name) {
        const now = Date.now()
        console.log(name, "wait time", now - lastTimestamp)
        lastTimestamp = now
    }
    function testTimeout() {
        const timer = setTimeout(() => {
            times = times + 1;
            clearTimeout(timer)
            test("timeout")
            if (times < MAX_TIMES) {
                testTimeout()
            }
        })
    }
}


function testMessageChannel() {
    let times = 0;
    const channel = new MessageChannel()
    const port = channel.port2
    let last = Date.now()
    function testMessageTask() {
        times = times + 1;
        const now = Date.now()
        console.log("MessageChannel", "wait time", now - last)
        last = now
        if (times < MAX_TIMES) {
            port.postMessage(null)
        }
    }
    channel.port1.onmessage = testMessageTask
    // 启动
    port.postMessage(null)
}

const promise = new Promise((resolve) =>{
    const timer = setTimeout(() => {
        clearTimeout(timer)
        resolve(0)
    })
})
function testPromise() {
    for (let i = 0; i < MAX_TIMES; i++) {
        promise.then(() => {
            console.log("Promise then", i)
            return i
        })
    }
}

timeoutWrapper()
testMessageChannel()
testPromise(0)