<template>
  <h1>
    Network Topology for
    <span style="font-weight: bold; color: #4cc9f0">{{ deviceName }}</span>
  </h1>
  <hr>
  <div class="container">
    <!--   Filter Part   -->
    <div class="card">
      <h2>
        Filters
      </h2>
      <hr/>
      <div class="col-6 text-left">
        <h4>Number Of Logs</h4>
        <Dropdown id="numOfLogs"
                  :options="filters.logs"
                  optionLabel="label"
                  @change="onNumberChange($event)"
                  placeholder="2"
        >
        </Dropdown>
      </div>
    </div>
    <!-- Graphs Part   -->
    <div class="row">
      <!--   Graph Start     -->
      <div v-for="graph in graphs" v-bind:key="graph">
        <NetworkGraph :graph="graph"></NetworkGraph>
      </div>
    </div>
  </div>

</template>

<script>
import DeviceService from "../service/DeviceService";
import networkImage from "../../public/images/network-svgrepo-com.svg";
import NetworkGraph from "../components/NetworkGraph";

export default {
  components: {NetworkGraph},
  data() {
    return {
      deviceName: null,
      loading: true,
      logsNum: null,
      networkImage: networkImage,
      filters: {
        logs: [
          {label: 2, value: 2},
          {label: 5, value: 5},
          {label: 10, value: 10}
        ]
      },
      graphs: [],
    }
  },
  deviceService: null,
  created() {
    this.deviceService = new DeviceService();
  },
  mounted() {
    this.deviceName = this.$route.params.id;
    // TODO:: refactor this big func into smaller methods
    this.deviceService.getDeviceNetworkData(this.deviceName).then(response => {
      // loop over graphs
      response.data.forEach(graph => {
        let tmpGraph = {
          log_date: graph.log_date,
          log_time: graph.log_time,
          nodes: {},
          edges: {},
          layouts: {
            nodes: {},
          },
        };

        // loop over hops of each graph
        let hopsArr = graph.data.hops;
        let len = hopsArr.length;
        let x = -430; // x position of the first node (hop)
        let y = 90; // y position of the first node (hop)
        for (let i = 0; i < len; i++) {
          let currentHop = hopsArr[i];
          // let previousHop = hopsArr[(i+len-1)%len];
          let nextHop = hopsArr[(i + 1) % len];
          y = this.getRandomY(y, 50, 150); // y position of the first node (hop)
          // add nodes to graph; node = hop
          // first hop is source
          if (i === 0) {
            tmpGraph.nodes[currentHop.uuid] = {
              name: currentHop.address,
              icon: "&#xe320" /* Laptop */,
            };
          } else if (i === 1) {
            tmpGraph.nodes[currentHop.uuid] = {
              name: currentHop.address,
              icon: "&#xe328" /* Router */,
            };
          } else if (i === len - 1) { //last hop is destination
            tmpGraph.nodes[currentHop.uuid] = {
              name: currentHop.address,
              icon: "&#xe2bd" /* Cloud */,
            };
          } else { // other hops are intermediate hops
            tmpGraph.nodes[currentHop.uuid] = {
              name: currentHop.address,
              icon: "&#xe322" /* Memory */,
            };
          }

          // add edges; edge = arrow between hops
          if (i !== len - 1) { // if not last hop
            tmpGraph.edges[currentHop.uuid + '-edge'] = {
              source: currentHop.uuid,
              target: nextHop.uuid,
            };
          }

          // configure layouts
          tmpGraph.layouts.nodes[currentHop.uuid] = {
            x: x,
            y: y,
          };
          x += 55;
          y = y * -1; // change y direction
        }
        // push to the graphs array
        this.graphs.push(tmpGraph);
      });
    })
    this.loading = false;
  },
  methods: {
    getRandomY(oldValue, min, max) {
      // preserve the sign of the old value
      let sign = oldValue < 0 ? -1 : 1;
      let randInt = (Math.floor(Math.random() * (max - min + 1)) + min) * sign;
      // get random number until it is different from the old value
      if (oldValue === randInt || (oldValue + 30) > randInt) {
        return this.getRandomY(oldValue, min, max);
      } else {
        return randInt;
      }
    },

    onNumberChange(event) {
      console.log("event", event)
      // this.logsNum = ;
      // if query param already exist; update it with current value and reload
      if (this.$route.query.logs === undefined || this.$route.query.logs === null ) {
        // this.$route.query.logs = event.value.value;
        // // reload the page with the new query param
        // console.log("this.$route.query.test", this.$route)
        // console.log("this.$route.query.test", window.location.pathname)

      } else {
        console.log("this.$route.query.test", this.$route.query.page)
      }
      // if its not exist; go to the current page with the query param

    }
  }
}
</script>

<style scoped lang="scss">
.v-network-graph {
  width: 100%;
  height: 400px;
}
</style>
