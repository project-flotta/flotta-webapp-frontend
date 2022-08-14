<template>
  <h2>
    Network Topology for
    <span style="font-weight: bold; color: #4cc9f0">{{ deviceName }}</span>
  </h2>
  <hr>
  <div class="container">
    <div class="row">
      <!--   Graph Start     -->
      <div v-for="graph in graphs" v-bind:key="graph">
        <div class="col-7">
          <div class="card">
            <div class="p-card-title">
              <h3>
              <span>
                <img class="img-fluid align-center"
                     style="width: 30px; height: 30px"
                     :src="networkImage"
                     alt="Network Topology"/>
              </span>
                <span>
                  Log Time: {{ graph.log_date }} {{ graph.log_time }}
                </span>
              </h3>
            </div>
            <div class="card-body">
              <v-network-graph
                  :nodes="graph.nodes"
                  :edges="graph.edges"
                  :layouts="graph.layouts"
                  :configs="configs"
              >
                <!-- Use CSS to define references to external fonts.
                      To use CSS within SVG, use <defs>. -->
                <defs>
                  <!-- Cannot use <style> directly due to restrictions of Vue. -->
                  <component is="style">
                    @font-face { font-family: 'Material Icons'; font-style: normal; font-weight:
                    400; src:
                    url(https://fonts.gstatic.com/s/materialicons/v97/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2)
                    format('woff2'); }
                  </component>
                </defs>

                <!-- Replace the node component -->
                <!--                <template #override-node="{ nodeId, scale, config, ...slotProps }">-->
                <!--                  <circle :r="config.radius * scale" :fill="config.color" v-bind="slotProps"-->
                <!--                  />-->
                <!--                  &lt;!&ndash; Use v-html to interpret escape sequences for icon characters. &ndash;&gt;-->
                <!--                  <text-->
                <!--                      font-family="Material Icons"-->
                <!--                      :font-size="22 * scale"-->
                <!--                      fill="#ffffff"-->
                <!--                      text-anchor="middle"-->
                <!--                      dominant-baseline="central"-->
                <!--                      style="pointer-events: none"-->
                <!--                      v-html="nodes[nodeId].icon"-->
                <!--                  />-->
                <!--                </template>-->

              </v-network-graph>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import DeviceService from "../service/DeviceService";
import networkImage from "../../public/images/network-svgrepo-com.svg";

export default {
  data() {
    return {
      deviceName: null,
      loading: true,
      networkImage: networkImage,
      graphs: [
        {
          log_date: "",
          log_time: "",
          nodes: {},
          edges: {},
          layouts: {},
          configs: {},
        },
      ],
      layouts: {
        nodes: {
          node1: {x: -430, y: 80},
          node2: {x: -350, y: -80},
          node3: {x: -270, y: 80},
          node4: {x: -190, y: -80},
          node5: {x: -90, y: 80},
          node6: {x: 10, y: -80},
        },
      },
      configs: {
        view: {
          panEnabled: true,
          zoomEnabled: false,
        },
      },
      node: {
        normal: {
          color: "#3355bb",
          width: 5,
        },
        hover: {
          color: "#4cc9f0",
        },
      },
      // arrows configs
      edge: {
        selectable: true,
        normal: {
          width: 3,
          color: "#4466cc",
          dasharray: "0",
          linecap: "butt",
          animate: false,
          animationSpeed: 50,
        },
        hover: {
          width: 4,
          color: "#4cc9f0",
          dasharray: "0",
          linecap: "butt",
          animate: false,
          animationSpeed: 50,
        },
        selected: {
          width: 3,
          color: "#4cc9f0",
          dasharray: "6",
          linecap: "round",
          animate: false,
          animationSpeed: 50,
        },
        gap: 5,
        type: "straight",
        margin: 2,
        marker: {
          source: {
            type: "none",
            width: 4,
            height: 4,
            margin: -1,
            units: "strokeWidth",
            color: null,
          },
          target: {
            type: "arrow",
            width: 4,
            height: 4,
            margin: -1,
            units: "strokeWidth",
            color: null,
          },
        },
      },
    }
  },
  deviceService: null,
  created() {
    this.deviceService = new DeviceService();
  },
  mounted() {
    this.deviceName = this.$route.params.id;
    this.deviceService.getDeviceNetworkData(this.deviceName).then(response => {
      console.log("Start loop over graphs (response.data)", response.data);

      // loop over graphs
      response.data.forEach(graph => {
        let tmpGraph = {
          log_date: graph.log_date,
          log_time: graph.log_time,
          nodes: {},
          edges: {},
          layouts: {},
          configs: {},
        };

        // loop over hops
        let hopsArr = graph.data.hops;
        let len = hopsArr.length;
        for (let i = 0; i < len; i++) {
          let currentHop = hopsArr[i];
          // let previousHop = hopsArr[(i+len-1)%len];
          let nextHop = hopsArr[(i+1)%len];

          // first hop is source
          if (i === 0) {
            tmpGraph.nodes[currentHop.uuid] = {
              name: currentHop.address,
              icon: "&#xe8c7" /* Wifi */,
            };
          }
          // last hop is destination
          if(i === len - 1) {
            tmpGraph.nodes[currentHop.uuid] = {
              name: currentHop.address,
              icon: "&#xe2bd" /* Cloud */,
            };
          }
          // other hops are intermediate hops
          tmpGraph.nodes[currentHop.uuid] = {
            name: currentHop.address,
            icon: "&#xe328" /* Router */,
          };

          // add edges
          if (i !== len - 1) {
            tmpGraph.edges[currentHop.uuid+'-edge'] = {
              source: currentHop.uuid,
              target: nextHop.uuid,
            };
          }

          // configure layouts
          let x = -430;
          tmpGraph.layouts = {
            nodes: {
              [currentHop.uuid]: {
                x: x,
                y: 80,
              },
            },
          };
          x += 70;
        }

        console.log("tmpGraph", tmpGraph);
        // push to the graphs array
        this.graphs.push(tmpGraph);
      });
    })
    this.loading = false;
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">

.v-network-graph {
  width: 100%;
  height: 400px;
}
</style>
