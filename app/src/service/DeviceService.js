export default class DeviceService {
    listDevices() {
        return fetch(process.env.VUE_APP_API_URL+'/devices').then(res => res.json())
    }

    getDevice(id) {
        return fetch(process.env.VUE_APP_API_URL+'/devices/'+id).then(res => res.json())
    }

    getDeviceImage() {
        return fetch('images/cpu.png').then(
            res => res.blob()
        );
    }


    getDeviceNetworkData(id, params) {
        const queryParams = '?logs=' + params.logs
        return fetch(process.env.VUE_APP_API_URL + '/devices/' + id + '/network' + queryParams).then(res => res.json())
    }

    getDeviceCPUTempData(id) {
        return fetch(process.env.VUE_APP_API_URL+'/devices/'+id+'/cputemp').then(res => res.json())
    }
}
  