import { _ as __nuxt_component_0 } from "./nuxt-link-BGJ2n7Pz.js";
import { defineComponent, mergeProps, withCtx, createTextVNode, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from "vue/server-renderer";
import { e as useSupabaseUser, _ as _export_sfc } from "../server.mjs";
import { u as useSupabaseClient } from "./useSupabaseClient-H06rCZGb.js";
import "/Users/poj/innovation-awards/testing-project/node_modules/hookable/dist/index.mjs";
import "/Users/poj/innovation-awards/testing-project/node_modules/ufo/dist/index.mjs";
import "/Users/poj/innovation-awards/testing-project/node_modules/defu/dist/defu.mjs";
import "/Users/poj/innovation-awards/testing-project/node_modules/ofetch/dist/node.mjs";
import "#internal/nuxt/paths";
import "/Users/poj/innovation-awards/testing-project/node_modules/unctx/dist/index.mjs";
import "/Users/poj/innovation-awards/testing-project/node_modules/h3/dist/index.mjs";
import "vue-router";
import "@supabase/ssr";
import "@iconify/vue";
import "/Users/poj/innovation-awards/testing-project/node_modules/klona/dist/index.mjs";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const user = useSupabaseUser();
    useSupabaseClient();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<nav${ssrRenderAttrs(mergeProps({ class: "fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b" }, _attrs))}><div class="container mx-auto px-6 py-4 flex justify-between items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "font-bold text-xl text-[#003366]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Pegadaian Innovation`);
          } else {
            return [
              createTextVNode("Pegadaian Innovation")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex gap-6 items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/pia" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Awards`);
          } else {
            return [
              createTextVNode("Awards")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/repository" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Gallery`);
          } else {
            return [
              createTextVNode("Gallery")
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(user)) {
        _push(`<div class="flex gap-4 items-center"><span class="text-sm font-medium">${ssrInterpolate(unref(user).email)}</span><button class="text-red-500 font-bold">Logout</button></div>`);
      } else {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "bg-[#003366] text-white px-6 py-2 rounded-full font-bold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Login`);
            } else {
              return [
                createTextVNode("Login")
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`</div></div></nav>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Navbar = _sfc_main$1;
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Navbar, null, null, _parent));
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  _default as default
};
//# sourceMappingURL=default-IiH2bsPd.js.map
