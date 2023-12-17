const path = require('path')
module.exports = {
  title: "DEUS",
  description: "A Realtime Creation Engine",
  icon: "icon.png",
  menu: async (kernel) => {
    let server_installed = await kernel.exists(__dirname, "server", "env")
    let client_installed = await kernel.exists(__dirname, "client", "node_modules")
    let installed = server_installed && client_installed
    if (installed) {
      let running = await kernel.running(__dirname, "start.json")
      // how to ensure that this doesn't crash in old pinokio which doesn't have kernel.local

      // load new script from old pinokio
      let local = kernel.memory.local[path.resolve(__dirname, 'start.json')]
      if (running) {
        if (local && local.server && local.client) {
          return [{
            icon: "fa-solid fa-desktop",
            text: "Terminal",
            href: "start.json"
          }]
        } else {
          return [{
            icon: "fa-solid fa-house",
            text: "Web UI",
            href: local.client
          }, {
            icon: "fa-solid fa-desktop",
            text: "Terminal",
            href: "start.json"
          }]
        }
      } else {
        return [{ icon: "fa-solid fa-power-off", text: "Start", href: "start.json", }]
      }
    } else {
      return [{ icon: "fa-solid fa-plug", text: "Install", href: "install.json", }]
    }
  }
}
