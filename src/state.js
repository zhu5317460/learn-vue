import { observe } from "./observe/index";

export function initState(vm) {
  const opts = vm.$options; // 获取所有选项

  if (opts.data) {
    initData(vm);
  }

}

function proxy(vm, target, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[target][key];
    },
    set(newValue) {
      vm[target][key] = newValue;
    }
  });
}

function initData(vm) {
  let data = vm.$options.data; // data可能是函数或者对象
  data = typeof data === 'function' ? data.call(vm) : data;
  vm._data = data;
  // 拿到数据之后要对数据进行劫持
  observe(data);
  // 将vm._data 用vm来代理
  for (let key in data) {
    proxy(vm, "_data", key);
  }
  
}