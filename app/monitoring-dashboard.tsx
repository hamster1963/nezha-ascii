"use client";

import ServerFlag from "@/components/ServerFlag";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatNezhaInfo } from "@/lib/utils";
import { useWebSocketContext } from "@/lib/websocketProvider";
import { NezhaWebsocketResponse } from "@/types/nezha-api";

export default function MonitoringDashboard() {
  const { message } = useWebSocketContext();

  const messageData = JSON.parse(message) as NezhaWebsocketResponse;

  if (!messageData || !messageData.servers) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-green-500 p-1 sm:p-2 font-mono text-xs">
        Loading...
      </div>
    );
  }

  const totalServers = messageData.servers.length || 0;
  const onlineServers =
    messageData.servers.filter(
      (server) => formatNezhaInfo(messageData.now, server).online,
    )?.length || 0;
  const offlineServers =
    messageData.servers.filter(
      (server) => !formatNezhaInfo(messageData.now, server).online,
    )?.length || 0;

  return (
    <div className="min-h-screen bg-black text-green-500 p-1 sm:p-2 font-mono text-xs">
      {/* Header Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 mb-2 sm:mb-4">
        {[
          { label: "Total Servers", value: totalServers },
          { label: "Online", value: onlineServers, color: "text-green-400" },
          { label: "Offline", value: offlineServers, color: "text-red-500" },
          { label: "Network Traffic", value: "↑ 4.84 TiB ↓ 6.35 TiB" },
        ].map((stat, index) => (
          <div
            key={index}
            className="border border-green-800 bg-black/50 p-1 sm:p-2 rounded"
          >
            <div className="text-[10px] text-green-600">{stat.label}</div>
            <div className={`text-sm sm:text-base ${stat.color || ""}`}>
              {stat.value}
            </div>
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
              <th className="p-1 sm:p-2">Uptime</th>
              <th className="p-1 sm:p-2">Load</th>
              <th className="p-1 sm:p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {messageData.servers.map((server) => {
              const {
                name,
                country_code,
                online,
                cpu,
                up,
                down,
                mem,
                stg,
                platform,
                uptime,
                net_in_transfer,
                net_out_transfer,
                load_1,
              } = formatNezhaInfo(messageData.now, server);
              return (
                <tr key={server.name} className="border-t border-green-800/30">
                  <td className="p-1 sm:p-2 min-w-36">
                    <ServerFlag country_code={country_code} /> {name}
                  </td>
                  <td className="p-1 sm:p-2">
                    <div className="flex items-center gap-1">
                      <Progress value={cpu} className="w-14" />
                      <span
                        className={`w-12 text-right ${cpu > 80 ? "text-red-500" : "text-green-500"}`}
                      >
                        {cpu.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="p-1 sm:p-2">
                    <div className="flex items-center gap-1">
                      <Progress value={mem} className="w-14" />
                      <span
                        className={`w-12 text-right ${mem > 80 ? "text-red-500" : "text-green-500"}`}
                      >
                        {mem.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="p-1 sm:p-2">
                    <div className="flex items-center gap-1">
                      <Progress value={stg} className="w-14" />
                      <span
                        className={`w-12 text-right ${stg > 80 ? "text-red-500" : "text-green-500"}`}
                      >
                        {stg.toFixed(2)}%
                      </span>
                    </div>
                  </td>
                  <td className="p-1 sm:p-2">
                    {up >= 1024
                      ? `${(up / 1024).toFixed(2)}G/s`
                      : up >= 1
                        ? `${up.toFixed(2)}M/s`
                        : `${(up * 1024).toFixed(2)}K/s`}
                  </td>
                  <td className="p-1 sm:p-2">
                    {down >= 1024
                      ? `${(down / 1024).toFixed(2)}G/s`
                      : down >= 1
                        ? `${down.toFixed(2)}M/s`
                        : `${(down * 1024).toFixed(2)}K/s`}
                  </td>
                  <td className="p-1 sm:p-2">
                    {uptime / 86400 >= 1
                      ? `${(uptime / 86400).toFixed(0)} ${"days"}`
                      : `${(uptime / 3600).toFixed(0)} ${"hours"}`}
                  </td>
                  <td className="p-1 sm:p-2">{Number(load_1).toFixed(2)}</td>
                  <td className="p-1 sm:p-2">
                    <Badge variant={online ? "success" : "destructive"}>
                      {online ? "Online" : "Offline"}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Time and Network Stats */}
      <div className="mt-2 sm:mt-4 text-[10px] sm:text-xs text-green-600 flex flex-col sm:flex-row sm:justify-between">
        <div>Current time: 2:28:25 PM</div>
        <div>Network Speed: ↑ 4.23 MiB/s ↓ 3.15 MiB/s</div>
      </div>
    </div>
  );
}
