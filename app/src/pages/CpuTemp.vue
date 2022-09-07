<template>
  <h1>
    CPU Temperature for
    <span style="font-weight: bold; color: #4cc9f0">{{ deviceName }}</span>
  </h1>
  <hr>
  <div class="container">
    <!--   Filter Part   -->
    <!-- <div class="card">
      <h2>
        Filters
      </h2>
      <hr />
      <div class="grid p-fluid mt-3">
        <div class="field col-12 md:col-2">
          <span class="p-float-label">
          </span>
        </div>
      </div>
    </div> -->
    <!-- Graphs Part   -->
    <div class="row">
      <!--   Graph Start     -->
      <div class="col-12 lg:col-10">
        <div class="card">
          <Chart type="line" :data="lineData" :options="lineOptions" />
        </div>
      </div>
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
      lineData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'CPU Temperature over the day',
            data: [65, 90, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#4cc9f0',
            borderColor: '#4cc9f0',
            tension: .4
          },
        ]
      },
      lineOptions: {
        plugins: {
          legend: {
            labels: {
              color: '#495057',
              font: {
                size: 15,
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#495057',
              font: {
                size: 20,
              }
            },
            grid: {
              color: '#ebedef',
            },
            title: {
              display: true,
              text: 'Hours',
              font: {
                size: 30,
              }
            }
          },
          y: {
            ticks: {
              color: '#495057',
              font: {
                size: 20,
              }
            },
            grid: {
              color: '#ebedef',
            },
            title: {
              display: true,
              text: 'Temp',
              font: {
                size: 30,
              }
            }
          },
        }
      },
    }
  },
  deviceService: null,
  created() {
    this.deviceService = new DeviceService();
  },
  mounted() {
    this.deviceName = this.$route.params.id;
    this.deviceService.getDeviceCPUTempData(this.deviceName).then(response => {
      this.lineData.labels = response.data.labels;
      this.lineData.datasets[0].data = response.data.degrees;
      this.loading = false;
    })
    this.loading = false;
  },
  methods: {}
}
</script>

<style scoped lang="scss">
</style>
