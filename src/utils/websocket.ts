import { wsUrl } from './../service/prefix';
import { showToast } from 'vant';
// 初始话websocket连接
class SocketService {
    // 定义一个标识，判断是否实例化过该类
    static instanct: any = null
    static get Instance() {
        if (!this.instanct) {
            this.instanct = new SocketService()
        }
        return this.instanct
    }
    ws: any = null
    // 标识是否连接成功
    connected = false
    // 记录重试的次数
    sendRetryCount = 0
    // 记录重新连接的次数
    reconnectCount = 0
    // 回调函数集合 文本  音频  视频  图片等
    callBackMapping: IObject = {}
    // 连接
    connect() {
        if (!window.WebSocket) {
            showToast("该浏览器不支持websocket连接")
            return
        }
        // 实例化websocket连接
        this.ws = new WebSocket(`${wsUrl}?userId=${localStorage.getItem("userId")}`)
        // 连接服务端成功事件
        this.ws.onopen = () => {
            console.log("连接ws成功")
            this.connected = true;
            this.reconnectCount = 0;
        }
        // 连接失败
        this.ws.onclose = () => {
            console.log("连接失败")
            this.connected = false
            this.reconnectCount++
            setTimeout(() => {
                this.connect()
            }, this.reconnectCount * 1000)
        }
        this.ws.onmessage = (msgInfo: IObject) => {
            const msgData = JSON.parse(msgInfo.data)
            console.log({ msgInfo }, msgData.chatType)
            if (msgData?.chatType && this.callBackMapping[msgData?.chatType]) {
                this.callBackMapping[`${msgData.chatType}`](msgData);
            }
        }
        this.ws.onerror = () => {
            console.log("[ws]:出错了")
        }
    }

    //回调函数的注册
    registerCallBack(chatType: string, callBack: () => void) {
        this.callBackMapping[chatType] = callBack
    }

    //取消回调函数
    unRegisterCallBack(socketType: string) {
        this.callBackMapping[socketType] = null
    }

    // 发送消息
    send(data: any) {
        if (this.connected) {
            this.sendRetryCount = 0;
            this.ws.send(JSON.stringify(data))
        } else {
            this.sendRetryCount++
            setTimeout(() => {
                this.ws.send(JSON.stringify(data))
            }, this.sendRetryCount * 1000)
        }
    }
}

export default SocketService;
