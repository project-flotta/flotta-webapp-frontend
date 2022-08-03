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
          <Column field="id" header="#" style="width: 10px"></Column>
          <Column field="name" header="Name">
            <template #body="{data}">
              <a :href="'/devices/' + data.name">{{data.name}}</a>
            </template>
          </Column>
          <Column field="date" header="Last Update" dataType="date" style="min-width:10rem"></Column>
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
      devices: [],
      loading: true,
    }
  },
  deviceService: null,
  created() {
    this.deviceService = new DeviceService();
  },
  mounted() {
    this.deviceService.listDevices().then(response => {
      response.data.forEach((device) => {
        let id = 1;
        this.devices.push({
          id: id++,
          name: device,
          date: new Date(2022, 8, 3, 9, 20)
        });
      });
    })
    this.loading = false;
  },
  methods: {}
}
</script>

<style scoped lang="scss">
</style>
