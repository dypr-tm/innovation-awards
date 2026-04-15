import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { u as useSupabaseClient } from './useSupabaseClient-H06rCZGb.mjs';
import './server.mjs';
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
import 'vue-router';
import '@supabase/ssr';
import '@iconify/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const password = ref("");
    useSupabaseClient();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50" }, _attrs))}><div class="w-full max-w-md bg-white p-8 rounded-3xl shadow-sm"><h1 class="text-2xl font-bold mb-6">Login</h1><input${ssrRenderAttr("value", unref(email))} class="w-full p-4 mb-4 border rounded-xl" placeholder="Email"><input${ssrRenderAttr("value", unref(password))} type="password" class="w-full p-4 mb-6 border rounded-xl" placeholder="Password"><button class="w-full py-4 bg-[#003366] text-white rounded-xl font-bold">Masuk</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-dywHJmwk.mjs.map
