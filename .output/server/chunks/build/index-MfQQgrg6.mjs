import { _ as __nuxt_component_0 } from './nuxt-link-BGJ2n7Pz.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import './server.mjs';
import 'vue-router';
import '@supabase/ssr';
import '@iconify/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full relative bg-gray-50/30 overflow-x-hidden pt-10" }, _attrs))}><section class="pt-20 pb-24 px-6 relative"><div class="container mx-auto max-w-4xl text-center"><h1 class="text-5xl md:text-6xl font-extrabold text-[#003366] tracking-tight mb-6"> Wujudkan Ide, <span class="text-[#D4AF37]">Masa Depan Bersama.</span></h1>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/pia",
        class: "inline-block px-10 py-5 bg-[#003366] text-white font-bold rounded-2xl shadow-xl hover:-translate-y-1 transition-all"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Lihat Inovasi `);
          } else {
            return [
              createTextVNode(" Lihat Inovasi ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-MfQQgrg6.mjs.map
