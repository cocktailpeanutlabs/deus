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
      let server_up = kernel.local('start.json').server
      let client_up = kernel.local('start.json').client
      if (running) {
        if (server_up && client_up) {
          return [{
            icon: "fa-solid fa-desktop",
            text: "Terminal",
            href: "start.json"
          }]
        } else {
          return [{
            icon: "fa-solid fa-house",
            text: "Web UI",
            href: client_up
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
