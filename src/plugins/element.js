import Vue from 'vue'
import {
  Button,
  Menu,
  MenuItem,
  Submenu,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Form,
  FormItem,
  Input,
} from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
locale.use(lang)
Vue.use(Input)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu) //
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
