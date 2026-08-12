export interface DedicatedServer {
  id: string
  cpuName: string
  cpuCores: string
  cpuBrand: "AMD" | "Intel"
  ram: number
  ramUnit: string
  storage: string
  storageGB: number
  storageType: "SSD" | "NVME" | "HDD"
  dc: string
  dcFull: string
  stock: number | "inStock"
  stockLabel: string
  price: number
  orderLink: string
}

export interface DediConfig {
  servers: DedicatedServer[]
}
