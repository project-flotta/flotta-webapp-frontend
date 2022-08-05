export default class DeviceService {
    listDevices() {
        return fetch(process.env.VUE_APP_API_URL+'/devices').then(res => res.json())
    }

    getDevice(id) {
        return fetch(process.env.VUE_APP_API_URL+'/devices/'+id).then(res => res.json())
    }
}
  