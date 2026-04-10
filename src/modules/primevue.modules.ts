import type { App } from 'vue'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import Button from 'primevue/button'
import Card from 'primevue/card'
import DataView from 'primevue/dataview'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'
import { PanelMenu } from 'primevue'
import { option } from '@primeuix/themes/aura/autocomplete'
import { DataTable } from 'primevue'
import { Column } from 'primevue'
import { Breadcrumb } from 'primevue'

import { Menubar } from 'primevue'

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
  app.component('Button', Button)
  app.component('Card', Card)
  app.component('DataView', DataView)
  app.component('ConfirmDialog', ConfirmDialog)
  app.component('Menubar', Menubar)
  app.component('PanelMenu', PanelMenu)
  app.component('DataTable', DataTable)
  app.component('Column', Column)
  app.component('Breadcrumb', Breadcrumb)
}
