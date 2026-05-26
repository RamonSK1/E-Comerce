import type { App } from 'vue'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import Button from 'primevue/button'
import Card from 'primevue/card'
import DataView from 'primevue/dataview'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import InputNumber from 'primevue/inputnumber'
import PanelMenu from 'primevue/panelmenu'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Breadcrumb from 'primevue/breadcrumb'
import Menubar from 'primevue/menubar'
import { Toast } from 'primevue'
import { ToastService } from 'primevue'

export function setPrimeVue(app: App): void {
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: '.dark',
      },
    },
  })
  app.use(ConfirmationService)
  app.use(ToastService)
  app.component('Toast', Toast)
  app.component('Button', Button)
  app.component('Card', Card)
  app.component('DataView', DataView)
  app.component('ConfirmDialog', ConfirmDialog)
  app.component('Menubar', Menubar)
  app.component('PanelMenu', PanelMenu)
  app.component('DataTable', DataTable)
  app.component('Column', Column)
  app.component('Breadcrumb', Breadcrumb)
  app.component('InputText', InputText)
  app.component('Password', Password)
  app.component('InputNumber', InputNumber)
}
