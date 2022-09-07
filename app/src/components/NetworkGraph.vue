<template>
      <!--   Graph Start     -->
        <div class="col-9">
          <div class="card">
            <div class="p-card-title">
              <h2>
                <span>
                  <img class="img-fluid align-center" style="width: 30px; height: 30px" :src="networkImage"
                       alt="Network Topology"/>
                </span>
                <span>
                  Log Time: {{ graph.log_date }} {{ graph.log_time }} UTC
                </span>
              </h2>
              <hr/>
            </div>
            <div class="card-body">
              <v-network-graph :nodes="graph.nodes" :edges="graph.edges" :layouts="graph.layouts"
                               :configs="configs">
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
                  <circle :r="config.radius * scale" :fill="config.color" v-bind="slotProps"/>
                  <!-- &lt;!&ndash; Use v-html to interpret escape sequences for icon characters. &ndash;&gt; -->
                  <text font-family="Material Icons" :font-size="40 * scale" fill="#ffffff" text-anchor="middle"
                        dominant-baseline="central" style="pointer-events: none" v-html="graph.nodes[nodeId].icon"/>
                </template>
                <template #edge-overlay="{ scale, center, position, hovered, selected }">
                  <!-- Place the triangle at the center of the edge -->
                  <path class="marker" :class="{ hovered, selected }" d="M-5 -5 L5 0 L-5 5 Z"
                        :transform="makeTransform(center, position, scale)"/>
                </template>

              </v-network-graph>
            </div>
          </div>
          <hr/>
        </div>
</template>

<script>
import DeviceService from "../service/DeviceService";
import networkImage from "../../public/images/network-svgrepo-com.svg";

export default {
  props: {
    graph: {}
  },
  data() {
    return {
      networkImage: networkImage,
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
          normal: {color: "#5555dd"},
          hover: {color: "#dd5555"},
          selected: {color: "#dddd55"},
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

  },
  methods: {
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
    },
  }
}
</script>

<style scoped lang="scss">
.v-network-graph {
  width: 100%;
  height: 400px;
}
</style>
