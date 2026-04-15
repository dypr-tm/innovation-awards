import { defineComponent, ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrInterpolate } from "vue/server-renderer";
import "jspdf";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "submit",
  __ssrInlineRender: true,
  setup(__props) {
    const title = ref("");
    const description = ref("");
    const messages = ref([{ role: "assistant", content: "Halo! Ceritakan ide inovasimu..." }]);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pt-24 pb-12 px-6 bg-gray-50 min-h-screen" }, _attrs))}><div class="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-sm"><h1 class="text-3xl font-bold text-[#003366] mb-8">Kirim Inovasimu</h1><input${ssrRenderAttr("value", unref(title))} class="w-full p-4 mb-4 border rounded-xl" placeholder="Judul Inovasi"><div class="h-96 overflow-y-auto mb-4 border p-4 rounded-xl space-y-4"><!--[-->`);
      ssrRenderList(unref(messages), (m) => {
        _push(`<div class="${ssrRenderClass(m.role === "user" ? "text-right" : "text-left")}"><span class="${ssrRenderClass([m.role === "user" ? "bg-[#003366] text-white" : "bg-gray-100 text-gray-800", "inline-block p-3 rounded-2xl max-w-[80%]"])}">${ssrInterpolate(m.content)}</span></div>`);
      });
      _push(`<!--]--></div><div class="flex gap-2"><input${ssrRenderAttr("value", unref(description))} class="flex-grow p-4 border rounded-xl" placeholder="Ketik ide..."><button class="bg-[#003366] text-white px-6 rounded-xl font-bold">Kirim</button></div><button class="mt-8 w-full py-4 bg-green-600 text-white rounded-xl font-bold">Download Draft PDF</button></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/pia/submit.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=submit-SXtYKlig.js.map
