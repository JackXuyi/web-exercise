class Queue {
    constructor(maxTask) {
        this.maxTask = maxTask
        this.runningTask = 0
        this.taskQueue = []
    }

    push(task) {
        if (Array.isArray(task)) {
            task.forEach((t) => {
                this.taskQueue.push(t)
            })
        } else {
            this.taskQueue.push(task)
        }

        this.run()
    }

    async runTask(task) {
        try {
            this.runningTask ++
            await task()
        } catch(e) {
            console.error(e)
        } finally {
            this.run()
            this.runningTask --
        }
    }

    run() {
        if (this.canRunTask()) {
            const task = this.taskQueue.shift()
            this.runTask(task)
            this.run()
        }
    }

    canRunTask() {
        return !this.isEmpty() && this.runningTask < this.maxTask
    }

    isEmpty() {
        return !this.taskQueue.length
    }
}


const taskQueue = new Queue(3)

const timeList = [100, 300, 500, 900, 600]
const taskList = (new Array(20).fill(0)).map((item, index) => {
    return () => new Promise((resolve, reject) => {
        const time = index % timeList.length
        console.log("task ", index, "time ", timeList[time], "start")
        const timer = setTimeout(() => {
            clearTimeout(timer)
            console.log("task ", index, "time ", timeList[time], "finished")
            if (index % 5 === 0) {
                reject("error")
            } else {
                resolve("success")
            }
            
        }, timeList[time])
    })
})

taskQueue.push(taskList)