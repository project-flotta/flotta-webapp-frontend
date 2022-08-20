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
              <h2>
                <span>
                  <img class="img-fluid align-center" style="width: 30px; height: 30px" :src="networkImage"
                    alt="Network Topology" />
                </span>
                <span>
                  Log Time: {{ graph.log_date }} {{ graph.log_time }}
                </span>
              </h2>
              <hr />
            </div>
            <div class="card-body">
              <v-network-graph :nodes="graph.nodes" :edges="graph.edges" :layouts="graph.layouts"
                :configs="graph.configs">
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

                  <component is="style">
                    <!-- prettier-ignore -->
                    .marker {
                    fill: {{ configs.edge.normal.color }};
                    transition: fill 0.1s linear;
                    pointer-events: none;
                    }
                    .marker.hovered { fill: {{ configs.edge.hover.color }}; }
                    .marker.selected { fill: {{ configs.edge.selected.color }}; }
                  </component>
                </defs>

                <!-- Replace the node component -->
                <template #override-node="{ nodeId, scale, config, ...slotProps }">
                  <circle :r="config.radius * scale" :fill="config.color" v-bind="slotProps" />
                  <!-- &lt;!&ndash; Use v-html to interpret escape sequences for icon characters. &ndash;&gt; -->
                  <text font-family="Material Icons" :font-size="40 * scale" fill="#ffffff" text-anchor="middle"
                    dominant-baseline="central" style="pointer-events: none" v-html="graph.nodes[nodeId].icon" />
                </template>
                <template #edge-overlay="{ scale, center, position, hovered, selected }">
                  <!-- Place the triangle at the center of the edge -->
                  <path class="marker" :class="{ hovered, selected }" d="M-5 -5 L5 0 L-5 5 Z"
                    :transform="makeTransform(center, position, scale)" />
                </template>

              </v-network-graph>
            </div>
          </div>
          <hr />
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
      graphs: [],
      configs: {
        view: {
          panEnabled: false,
          zoomEnabled: false,
        },
        node: {
          normal: {
            radius: 28,           // radius of circle.      default: 16
            color: "#F94892",          // fill color.            default: "#4466cc"
            strokeWidth: 10,      // stroke width.          default: 0
            // strokeColor: string | undefined              // stroke color.      default: "#000000"
            // strokeDasharray: number | string | undefined  // stroke dash array. default: 0
          },
          label: {
            // * These fields can also be specified with the function as `(node) => value`.
            // fontFamily: string | undefined  // font family.       default: undefined
            fontSize: 15,                // font size.         default: 11
            // lineHeight: 1.2,              // line height (multiplier for font size). default: 1.1
            color: "#000000",                   // font color.        default: "#000000"
            background: {                    // background config. default: undefined
              visible: true,          // whether the background is visible or not.
              color: "#e7e7e7",           // background color.
              padding: {        // padding.
                vertical: 3,      // vertical padding.
                horizontal: 2,     // horizontal padding.
              },
              borderRadius: 10,       // border radius.
            }
          },
        },
        // arrows configs
        edge: {
          selectable: true,
          normal: { color: "#5555dd" },
          hover: { color: "#dd5555" },
          selected: { color: "#dddd55" },
          gap: 10,
        },
      }
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
          layouts: {
            nodes: {},
          },
          configs: {},
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
          console.log("y", y);
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
        // configure configs
        tmpGraph.configs = this.configs;
        console.log("##### finaltmpGraph", tmpGraph);
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

    makeTransform(center, edgePos, scale) {
      const radian = Math.atan2(
        edgePos.target.y - edgePos.source.y,
        edgePos.target.x - edgePos.source.x
      )
      const degree = (radian * 180.0) / Math.PI

      return [
        `translate(${center.x} ${center.y})`,
        `scale(${scale}, ${scale})`,
        `rotate(${degree})`,
      ].join(" ")
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
