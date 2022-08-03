<template>
  <div class="grid">
    <div class="col-6 w-25">
      <div class="card">
        <h5>Network Topology</h5>
        <v-network-graph
            :nodes="nodes"
            :edges="edges"
            :layouts="layouts"
            :configs="configs"
        />
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
      nodes: {
        node1: {name: "N1", icon: "&#xe320" /* Laptop Mac */},
        node2: {name: "N2", icon: "&#xe328" /* Router */},
        node3: {name: "N3", icon: "&#xe331" /* Tablet Mac */},
        node4: {name: "N4", icon: "&#xe2bd" /* Cloud */},
        // node5: {name: "N5", icon: "&#xf0e2" /* Support Agent */},
        // node6: {name: "N6", icon: "&#xea75" /* Video Settings */},
      },
      edges: {
        edge1: {source: "node1", target: "node2"},
        edge2: {source: "node2", target: "node3"},
        edge3: {source: "node3", target: "node4"},
      },
      layouts: {
        nodes: {
          node1: {x: 0, y: 0},
          node2: {x: 50, y: 50},
          node3: {x: 100, y: 0},
          node4: {x: 150, y: 50},
        },
      },
      configs: {
        view: {
          panEnabled: true,
          zoomEnabled: false,
        },
        node: {
          normal: {
            color: "#4466cc88",
          },
        },
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
            color: "#3355bb",
            dasharray: "0",
            linecap: "butt",
            animate: false,
            animationSpeed: 50,
          },
          selected: {
            width: 3,
            color: "#dd8800",
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
    created()
{
  this.deviceService = new DeviceService();
}
,
mounted()
{
  this.deviceService.getDevices().then(response => {
    this.devices = response.data;
  })
  this.loading = false;
}
,
methods: {
}
}
</script>

<style scoped lang="scss">
</style>
