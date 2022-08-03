<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <h5>List Devices</h5>
        <DataTable :value="devices"
                   :scrollable="false"
                   :loading="loading"
                   class="mt-3"
        >
          <Column field="id" header="Id"></Column>
          <Column field="name" header="Name"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import DeviceService from "../service/DeviceService";

export default {
  data() {
    return {
      devices: null,
      loading: true,
    }
  },
  deviceService: null,
  created() {
    this.deviceService = new DeviceService();
  },
  mounted() {
    this.deviceService.getDevices().then(response => {
      this.devices = response.data;
    })
    this.loading = false;
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
</style>
