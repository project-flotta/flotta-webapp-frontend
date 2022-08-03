export default class DeviceService {
    getDevices() {
        return fetch(process.env.VUE_APP_API_URL+'/devices').then(res => res.json())
    }
}
  