import fs from 'fs'

export function logging({ event, data }: { event: string, data: string }) {
  const log = {
    event,
    data,
    timestamp: new Date().toISOString(),
  }
  console.log(`${log.timestamp} | ${log.event} | ${log.data}`)
  fs.appendFileSync('./logs/logs.txt', JSON.stringify(log) + '\n')
}
