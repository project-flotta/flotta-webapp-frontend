<template>
  <div class="grid">
    <div class="col-12 md:col-4 hover:bg-blue-200">
      <a :href="'/devices/'+ deviceName +'/network'">
        <div class="card">
          <h3>Network Topology</h3>
          <img class="img-fluid align-center" style="width: 100px; height: 100px" :src="networkImage()"
               alt="Network Topology"/>
        </div>
      </a>
    </div>
    <div class="col-12 md:col-4 hover:bg-red-200">
      <a :href="'/devices/'+ deviceName +'/cputemp'">
        <div class="card">
          <h3>CPU Temperature</h3>
          <img class="img-fluid align-center" style="width: 100px; height: 100px" :src="cpuImage()"
               alt="CPU Temperature"/>
        </div>
      </a>
    </div>
  </div>
</template>


<script>
import DeviceService from "../service/DeviceService";

export default {
  data() {
    return {
      deviceName: null,
      loading: true,
    }
  },
  deviceService: null,
  created() {
    this.deviceService = new DeviceService();
  },
  mounted() {
    console.log("mounted");
    this.deviceName = this.$route.params.id;
    this.deviceService.getDevice(this.deviceName).then(response => {
      console.log(response);
    })
    this.loading = false;
  },
  methods: {
    cpuImage() {
      return '../images/cpu.png';
    },
    networkImage() {
      return '../images/network-svgrepo-com.svg';
    }
  }
}
</script>

<style scoped lang="scss">
</style>
