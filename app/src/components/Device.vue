<template>
  <div class="grid">
    <div class="col-8 w-255">
      <div class="card">
        <h3>
          Network Topology for
          <span style="font-weight: bold; color: #4cc9f0">{{ deviceName }}</span>
        </h3>
        <template>
        </template>
        <v-network-graph
            :nodes="nodes"
            :edges="edges"
            :layouts="layouts"
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
        <template #override-node="{ nodeId, scale, config, ...slotProps }">
          <circle :r="config.radius * scale" :fill="config.color" v-bind="slotProps"
          />
          <!-- Use v-html to interpret escape sequences for icon characters. -->
          <text
              font-family="Material Icons"
              :font-size="22 * scale"
              fill="#ffffff"
              text-anchor="middle"
              dominant-baseline="central"
              style="pointer-events: none"
              v-html="nodes[nodeId].icon"
          />
        </template>

        </v-network-graph>
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
      nodes: {
        node1: {name: "N1", icon: "&#xe8c7" /* Wifi */},
        node2: {name: "N2", icon: "&#xe328" /* Router */},
        node3: {name: "N3", icon: "&#xe322" /* Tablet Mac */},
        node4: {name: "N4", icon: "&#xe322" /* Cloud */},
        node5: {name: "N5", icon: "&#xe322" /* Support Agent */},
        node6: {name: "N6", icon: "&#xe2bd" /* Cloud */},
      },
      edges: {
        edge1: {source: "node1", target: "node2"},
        edge2: {source: "node2", target: "node3"},
        edge3: {source: "node3", target: "node4"},
        edge4: {source: "node4", target: "node5"},
        edge5: {source: "node5", target: "node6"},
      },
      layouts: {
        nodes: {
          node1: {x: -200, y: -150},
          node2: {x: -150, y: -50},
          node3: {x: 100, y: -300},
          node4: {x: 150, y: 150},
          node5: {x: 200, y: 0},
          node6: {x: 250, y: 90},
        },
      },
      configs: {
        view: {
          panEnabled: true,
          zoomEnabled: false,
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
    }
  },
  deviceService: null,
  created() {
    this.deviceService = new DeviceService();
  },
  mounted() {
    this.deviceName = this.$route.params.id;
    // this.deviceService.getDevice(this.deviceName).then(response => {
    //   console.log("response.data", response.data.Hops);
    //
    //   response.data.Hops.forEach((hop) => {
    //     // obj = { ...obj, ...objToAdd1 };
    //     console.log("hop ", hop);
    //
    //     this.nodes = {
    //       ...this.nodes,
    //       ...{ name: hop.Address.join("").toString(), icon: "&#xe328" /* Router */}
    //     };
    //     // this.edges = {
    //     //   ...this.edges,
    //     //   ...{ source: hop.Address.join("").toString(), target: hop.NextHop.join("").toString() }
    //     // };
    //     console.log("nodes ", this.nodes);
    //   });
    // })
    this.loading = false;
  },
  methods: {}
}
</script>

<style scoped lang="scss">
</style>
