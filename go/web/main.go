package main

import (
	"bytes"
	"encoding/json"
	"os/exec"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/host"
	"github.com/shirou/gopsutil/mem"
	"github.com/shirou/gopsutil/net"
)

type  ResultResponse struct {
    Code int `json:"code"`
    // 文件系统
    FStotal string `json:"FStotal"` // 磁盘大小
    Fsfree string `json:"fsfree"`
    Fsw string `json:"fsw"`
    // 内存
    MEMtotal string `json:"MEMtotal"` // 内存大小
    MEMactive string `json:"MEMactive"`
    MEM string `json:"MEM"`
    // 网络
    Established uint64 `json:"established"` // 建立连接数
    Listen uint64 `json:"listen"` // 监听端口数
    All int `json:"all"` // 可连接总数
    RX uint64 `json:"RX"` // 接收数据大小
    TX uint64 `json:"TX"` // 发送数据大小
    RXT uint64 `json:"RXT"` // 接收数据大小
    TXT uint64 `json:"TXT"` // 发送数据大小
    TIO string `json:"tIO"` // 网速
    // cpu
    CPU  float64 `json:"CPU"` // cpu类型
    CPUhz string `json:"CPUhz"`
    // 系统
    Type string `json:"type"` // 系统类型
    Day string `json:"day"` // 开机时间
    CurrentLoadSystem uint64 `json:"currentLoadSystem"` // 
    // 硬件
    Temp string `json:"Temp"` // 温度
    // 其他
}

//获取CPU温度
func getCpuTemp() (string, error) {
    cmd := exec.Command("cat", "/sys/class/thermal/thermal_zone0/temp")
    var out bytes.Buffer
    cmd.Stdout = &out
    err := cmd.Run()
    if err != nil {
            return "", err
    }
    tempStr := strings.Replace(out.String(), "\n", "", -1)
    temp, err := strconv.Atoi(tempStr)
    if err != nil {
            return "", err
    }
    temp = temp / 1000
    return strconv.Itoa(temp), nil
}

var GB = 1024 * 1024 * 1024 * 1.0;
var MB = 1024 * 1024 * 1.0;

func getInfo()(ResultResponse) {
    res := ResultResponse{
        Code: 200,
    }
    
    // 温度
    tem, _ := getCpuTemp()
    res.Temp = tem;
    //  mem
    v, _ := mem.VirtualMemory()
    res.MEMtotal = strconv.FormatFloat(float64(float64(v.Total)/GB), 'f', 2, 64) + "G"
    res.MEMactive = strconv.FormatFloat(float64(float64(v.Active)/GB), 'f', 2, 64) + "G"
    res.MEM = strconv.FormatFloat(float64(float64(v.Free)/GB), 'f', 2, 64) + "G"
    // 磁盘
    disk, _ := disk.Usage("/")
    res.FStotal =  strconv.FormatFloat(float64(float64(disk.Total)/GB), 'f', 2, 64) + "G" 
    res.Fsfree = strconv.FormatFloat(float64(float64(disk.Free)/GB), 'f', 2, 64) + "G" 
    res.Fsw = strconv.FormatFloat(100.0 * (float64(disk.Total)/GB - float64(disk.Free)/GB) / float64(float64(disk.Total)/GB), 'f', 2, 64) + "%"
    // cpu
    infos, _ := cpu.Info()
    for _, info := range infos {
        res.CPUhz = strconv.FormatFloat(float64(info.Mhz / 1000), 'f', 2,64) + "Ghz"
    }
    percents, _ := cpu.Percent(1000, true)
    for _, info := range percents {
        res.CPU = info
    }
    // host
    platform, _, _, _ := host.PlatformInformation()
    res.Type = platform
    // 开机时间
    timestamp, _ := host.BootTime()
    day:= 24 * 3600 * 1000
    diff:= time.Now().Unix() - int64(timestamp)
    res.Day = strconv.FormatFloat(float64(float64(diff) / float64(day)), 'f', 2, 64) + "天"

    // 网络
    connects, _ := net.IOCounters(true)
    var rx uint64 = 0
    var tx uint64 = 0
    var rxt uint64 = 0
    var txt uint64 = 0
    for _, connect := range connects {
        rxt = rxt + connect.BytesRecv
        txt = txt + connect.BytesSent
        rx = rx + connect.BytesRecv
        tx = tx + connect.BytesSent
        
        res.TIO = strconv.FormatFloat(float64(float64(connect.BytesRecv) / MB), 'f', 2, 64) + "M"
        // res.Established =
    }
    // res.RX = strconv.FormatFloat(float64(float64(rx) / MB), 'f', 2, 64) + "M"
    // res.TX = strconv.FormatFloat(float64(float64(tx) / MB), 'f', 2, 64) + "M"
    res.RX = rx
    res.TX = tx
    res.RXT = rxt
    res.TXT = txt
    conns,_ := net.Connections("tcp")
    // res.RXT = strconv.FormatFloat(float64(float64(rx) / MB), 'f', 2, 64) + "M"
    // res.TXT = strconv.FormatFloat(float64(float64(tx) / MB), 'f', 2, 64) + "M"
    res.All = len(conns)
    return res
}

func main() {
    app := fiber.New()

    app.Get("/", func(c *fiber.Ctx) error {
        
        res := getInfo()
        str,_ := json.Marshal(&res);
        return c.SendString(string(str))
    })

    app.Post("/serve", func(c *fiber.Ctx) error {
        res := getInfo()
        str,_ := json.Marshal(&res);
        return c.SendString(string(str))
    })

    app.Listen(":3000")
}


