"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

interface ServerMetrics {
  name: string
  flag: string
  cpu: number
  memory: number
  storage: number
  uploadSpeed: string
  downloadSpeed: string
  status: "online" | "offline"
  ping: number
  load: number
}

export default function MonitoringDashboard() {
  const servers: ServerMetrics[] = [
    {
      name: "Huawei-SG",
      flag: "🇸🇬",
      cpu: 4.35,
      memory: 57.14,
      storage: 27.77,
      uploadSpeed: "0.10M/s",
      downloadSpeed: "0.03M/s",
      status: "online",
      ping: 32,
      load: 0.25
    },
    {
      name: "Huawei-HK",
      flag: "🇭🇰",
      cpu: 0.00,
      memory: 39.19,
      storage: 19.90,
      uploadSpeed: "0.00M/s",
      downloadSpeed: "0.00M/s",
      status: "online",
      ping: 45,
      load: 0.10
    },
    {
      name: "Ali-Core",
      flag: "🇨🇳",
      cpu: 4.55,
      memory: 47.51,
      storage: 45.83,
      uploadSpeed: "0.08M/s",
      downloadSpeed: "0.08M/s",
      status: "online",
      ping: 28,
      load: 0.35
    },
    {
      name: "CN-Core",
      flag: "🇨🇳",
      cpu: 1.34,
      memory: 49.86,
      storage: 78.65,
      uploadSpeed: "0.29M/s",
      downloadSpeed: "0.01M/s",
      status: "online",
      ping: 30,
      load: 0.20
    },
    {
      name: "RK3399",
      flag: "🇨🇳",
      cpu: 2.35,
      memory: 31.08,
      storage: 94.03,
      uploadSpeed: "0.01M/s",
      downloadSpeed: "0.01M/s",
      status: "online",
      ping: 35,
      load: 0.15
    },
    {
      name: "Oracle-CA",
      flag: "🇨🇦",
      cpu: 2.38,
      memory: 11.03,
      storage: 9.55,
      uploadSpeed: "0.00M/s",
      downloadSpeed: "0.00M/s",
      status: "online",
      ping: 80,
      load: 0.05
    },
    {
      name: "KES-NAS",
      flag: "🇺🇸",
      cpu: 1.99,
      memory: 38.56,
      storage: 99.52,
      uploadSpeed: "0.01M/s",
      downloadSpeed: "0.04M/s",
      status: "online",
      ping: 25,
      load: 0.30
    },
    {
      name: "KES-Surge",
      flag: "🇺🇸",
      cpu: 32.75,
      memory: 63.38,
      storage: 32.27,
      uploadSpeed: "3.34M/s",
      downloadSpeed: "2.55M/s",
      status: "online",
      ping: 20,
      load: 1.25
    }
  ]

  return (
    <div className="min-h-screen bg-black text-green-500 p-1 sm:p-2 font-mono text-xs">
      {/* Header Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 mb-2 sm:mb-4">
        {[
          { label: "Total Servers", value: "9" },
          { label: "Online", value: "9", color: "text-green-400" },
          { label: "Offline", value: "0", color: "text-red-500" },
          { label: "Network Traffic", value: "↑ 4.84 TiB ↓ 6.35 TiB" }
        ].map((stat, index) => (
          <div key={index} className="border border-green-800 bg-black/50 p-1 sm:p-2 rounded">
            <div className="text-[10px] text-green-600">{stat.label}</div>
            <div className={`text-sm sm:text-base ${stat.color || ''}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <div className="border border-green-800 rounded overflow-x-auto">
        <table className="w-full text-left text-[10px] sm:text-xs">
          <thead>
            <tr className="bg-green-900/20">
              <th className="p-1 sm:p-2">Server</th>
              <th className="p-1 sm:p-2">CPU</th>
              <th className="p-1 sm:p-2">Memory</th>
              <th className="p-1 sm:p-2">Storage</th>
              <th className="p-1 sm:p-2">Upload</th>
              <th className="p-1 sm:p-2">Download</th>
              <th className="p-1 sm:p-2">Ping</th>
              <th className="p-1 sm:p-2">Load</th>
              <th className="p-1 sm:p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {servers.map((server) => (
              <tr key={server.name} className="border-t border-green-800/30">
                <td className="p-1 sm:p-2 min-w-36">
                  {server.flag} {server.name}
                </td>
                <td className="p-1 sm:p-2">
                  <div className="flex items-center gap-1">
                    <Progress value={server.cpu} className="w-14" />
                    <span className={`w-12 text-right ${server.cpu > 80 ? "text-red-500" : "text-green-500"}`}>
                      {server.cpu.toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="p-1 sm:p-2">
                  <div className="flex items-center gap-1">
                    <Progress value={server.memory} className="w-14" />
                    <span className={`w-12 text-right ${server.memory > 80 ? "text-red-500" : "text-green-500"}`}>
                      {server.memory.toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="p-1 sm:p-2">
                  <div className="flex items-center gap-1">
                    <Progress value={server.storage} className="w-14" />
                    <span className={`w-12 text-right ${server.storage > 80 ? "text-red-500" : "text-green-500"}`}>
                      {server.storage.toFixed(2)}%
                    </span>
                  </div>
                </td>
                <td className="p-1 sm:p-2">{server.uploadSpeed}</td>
                <td className="p-1 sm:p-2">{server.downloadSpeed}</td>
                <td className="p-1 sm:p-2">{server.ping}ms</td>
                <td className="p-1 sm:p-2">{server.load.toFixed(2)}</td>
                <td className="p-1 sm:p-2">
                  <Badge variant={server.status === "online" ? "success" : "destructive"}>
                    {server.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Time and Network Stats */}
      <div className="mt-2 sm:mt-4 text-[10px] sm:text-xs text-green-600 flex flex-col sm:flex-row sm:justify-between">
        <div>Current time: 2:28:25 PM</div>
        <div>Network Speed: ↑ 4.23 MiB/s ↓ 3.15 MiB/s</div>
      </div>
    </div>
  )
}

