"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Server, ChevronUp, ChevronDown, ChevronsUpDown, SlidersHorizontal, X, Check, ShoppingCart } from "lucide-react"
import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import dediConfig from "../../config/sections/dedicated.json"
import type { DediConfig, DedicatedServer } from "../../types/dedicated"
import { CurrencySelector, useCurrency } from "../../components/ui/CurrencySelector"
import { useLanguage } from "../../contexts/LanguageContext"

const config = dediConfig as DediConfig

// ─── Constants ────────────────────────────────────────────────────────────────

const DC_OPTIONS = [
  { id: "NL", label: "Amsterdam", flag: "🇳🇱" },
  { id: "LAX", label: "Los Angeles", flag: "🇺🇸" },
  { id: "MIA", label: "Miami", flag: "🇺🇸" },
  { id: "PNJ", label: "New York City Metro", flag: "🇺🇸" },
]

const RAM_OPTIONS = [8, 32, 64, 128, 192, 256]
const STORAGE_TYPES = ["SSD", "NVME", "HDD"] as const

type SortField = "cpuName" | "ram" | "storageGB" | "price"
type SortDir = "asc" | "desc"

// ─── Helper components ────────────────────────────────────────────────────────

function StockBadge({ server }: { server: DedicatedServer }) {
  if (server.stock === "inStock") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        In Stock
      </span>
    )
  }
  const n = server.stock as number
  const color = n <= 1 ? "orange" : n <= 3 ? "amber" : "yellow"
  const colorMap = {
    orange: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    amber: "bg-amber-500/20  text-amber-400  border-amber-500/30",
    yellow: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${colorMap[color]}`}>
      <span className={`w-1.5 h-1.5 rounded-full bg-current`} />
      {server.stockLabel}
    </span>
  )
}

function DCBadge({ dc }: { dc: string }) {
  return (
    <span className="inline-flex items-center justify-center min-w-[44px] px-2 py-1 rounded text-xs font-bold bg-[#1a1b2e] text-gray-300 border border-gray-700/60 tracking-wide">
      {dc}
    </span>
  )
}

function SortIcon({ field, sortField, sortDir }: { field: SortField; sortField: SortField; sortDir: SortDir }) {
  if (sortField !== field) return <ChevronsUpDown className="w-3.5 h-3.5 text-gray-500 ml-1 shrink-0" />
  return sortDir === "asc"
    ? <ChevronUp className="w-3.5 h-3.5 icon-primary ml-1 shrink-0" />
    : <ChevronDown className="w-3.5 h-3.5 icon-primary ml-1 shrink-0" />
}

const DC_FLAG_IMG: Record<string, string> = {
  NL:  "https://flagcdn.com/w40/nl.png",
  LAX: "/flags/usa.png",
  MIA: "/flags/usa.png",
  PNJ: "/flags/usa.png",
}

function OrderDropdown({ server }: { server: DedicatedServer }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  const isAvailable = server.stock === "inStock" || (server.stock as number) > 0

  return (
    <div ref={ref} className="relative w-full">
      <button
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer orbitron-font inline-flex items-center justify-between w-full gap-2 px-3 py-2 rounded-lg text-xs font-bold button-primary text-button-primary border border-transparent hover:opacity-90 transition-all duration-200 whitespace-nowrap"
      >
        <span className="flex items-center gap-1.5">
          <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
          COMPRAR
        </span>
        <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="orderDrop"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 right-0 mt-1.5 w-56 rounded-xl bg-[#13141f] border border-gray-700/60 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="px-3 py-2 border-b border-gray-700/60">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Ubicación disponible</p>
            </div>
            {/* Location row */}
            <a
              href={server.orderLink}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-3 px-3 py-3 hover:bg-gray-800/60 transition-colors group/loc"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={DC_FLAG_IMG[server.dc] ?? "/flags/usa.png"}
                  alt={server.dc}
                  width={28}
                  height={20}
                  className="rounded-sm object-cover shrink-0"
                  style={{ width: 28, height: 20 }}
                />
                <div>
                  <p className="text-sm font-semibold text-white leading-tight group-hover/loc:text-purple-300 transition-colors">
                    {DC_OPTIONS.find(d => d.id === server.dc)?.label ?? server.dc}
                  </p>
                  <p className="text-xs text-gray-500">{server.dc}</p>
                </div>
              </div>
              {isAvailable ? (
                <span className="text-xs font-semibold text-emerald-400 shrink-0">
                  {server.stock === "inStock" ? "In Stock" : `${server.stock} left`}
                </span>
              ) : (
                <span className="text-xs font-semibold text-red-400 shrink-0">OOS</span>
              )}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function VDSPricingSection() {
  const { selectedCurrency, setSelectedCurrency, convertPrice } = useCurrency()
  const { t } = useLanguage()

  // ── Filter state ──────────────────────────────────────────────────────────
  const [filterDC, setFilterDC] = useState<string[]>([])
  const [filterBrand, setFilterBrand] = useState<string[]>([])
  const [filterCPUModels, setFilterCPUModels] = useState<string[]>([])
  const [filterRAM, setFilterRAM] = useState<number[]>([])
  const [filterStorageType, setFilterStorageType] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 800])
  const [showFilters, setShowFilters] = useState(true)
  const [cpuModelOpen, setCpuModelOpen] = useState(false)

  // ── Sort state ────────────────────────────────────────────────────────────
  const [sortField, setSortField] = useState<SortField>("price")
  const [sortDir, setSortDir] = useState<SortDir>("asc")

  // ── Derived values ────────────────────────────────────────────────────────
  const allCPUModels = useMemo(
    () => Array.from(new Set(config.servers.map((s) => s.cpuName))).sort(),
    []
  )

  // ── Toggle helpers ────────────────────────────────────────────────────────
  const toggle = useCallback(<T,>(arr: T[], val: T, set: (v: T[]) => void) => {
    set(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val])
  }, [])

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortDir("asc")
    }
  }

  // ── Filtered + sorted servers ─────────────────────────────────────────────
  const displayed = useMemo(() => {
    let list = config.servers as DedicatedServer[]

    if (filterDC.length) list = list.filter((s) => filterDC.includes(s.dc))
    if (filterBrand.length) list = list.filter((s) => filterBrand.includes(s.cpuBrand))
    if (filterCPUModels.length) list = list.filter((s) => filterCPUModels.includes(s.cpuName))
    if (filterRAM.length) list = list.filter((s) => filterRAM.includes(s.ram))
    if (filterStorageType.length) list = list.filter((s) => filterStorageType.includes(s.storageType))
    list = list.filter((s) => s.price >= priceRange[0] && s.price <= priceRange[1])

    list = [...list].sort((a, b) => {
      let diff = 0
      if (sortField === "cpuName") diff = a.cpuName.localeCompare(b.cpuName)
      else if (sortField === "ram") diff = a.ram - b.ram
      else if (sortField === "storageGB") diff = a.storageGB - b.storageGB
      else if (sortField === "price") diff = a.price - b.price
      return sortDir === "asc" ? diff : -diff
    })

    return list
  }, [filterDC, filterBrand, filterCPUModels, filterRAM, filterStorageType, priceRange, sortField, sortDir])

  const activeFilterCount = [
    filterDC, filterBrand, filterCPUModels, filterRAM, filterStorageType,
  ].reduce((n, f) => n + f.length, 0) + (priceRange[0] > 0 || priceRange[1] < 800 ? 1 : 0)

  const clearAll = () => {
    setFilterDC([])
    setFilterBrand([])
    setFilterCPUModels([])
    setFilterRAM([])
    setFilterStorageType([])
    setPriceRange([0, 800])
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="bg-gray-50 dark:bg-[#0a0b0f] relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/dedicated.webp')` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50/40 to-transparent dark:from-[#0a0b0f] dark:via-[#0a0b0f]/60 dark:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/80 to-gray-50/40 dark:from-[#0a0b0f] dark:via-[#0a0b0f]/95 dark:to-[#0a0b0f]/60" />
      </div>

      <div className="relative z-10 mt-16 max-w-7xl mx-auto">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 card-primary px-4 py-2 rounded-tl-xl rounded-br-2xl mb-4 border border-secondary">
                <span className="icon-text-primary text-sm">{t("dedicated.badge")}</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 orbitron-font">
                {t("dedicated.title").split(" ").slice(0, -1).join(" ")}{" "}
                <span className="icon-text-primary relative">
                  {t("dedicated.title").split(" ").slice(-1)[0]}
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1418 125"
                    className="absolute left-0 w-full text-icon-text-primary"
                    initial={{ opacity: 0, pathLength: 0 }}
                    animate={{ opacity: 1, pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <path
                      d="M1412.29 72.17c-11.04-5.78-20.07-14.33-85.46-25.24-22.37-3.63-44.69-7.56-67.07-11.04-167.11-22.06-181.65-21.24-304.94-30.56C888.78 1.39 822.57 1.1 756.44 0c-46.63-.11-93.27 1.56-139.89 2.5C365.5 13.55 452.86 7.68 277.94 23.15 202.57 33.32 127.38 45.01 52.07 55.69c-11.23 2.41-22.63 4.17-33.71 7.22C6.1 66.33 5.64 66.19 3.89 67.79c-7.99 5.78-2.98 20.14 8.72 17.5 33.99-9.47 32.28-8.57 178.06-29.66 4.26 4.48 7.29 3.38 18.42 3.11 13.19-.32 26.38-.53 39.56-1.12 53.51-3.81 106.88-9.62 160.36-13.95 18.41-1.3 36.8-3.12 55.21-4.7 23.21-1.16 46.43-2.29 69.65-3.4 120.28-2.16 85.46-3.13 234.65-1.52 23.42.99 1.57-.18 125.72 6.9 96.61 8.88 200.92 27.94 295.42 46.12 40.87 7.91 116.67 23.2 156.31 36.78 3.81 1.05 8.28-.27 10.51-3.58 3.17-3.72 2.66-9.7-.78-13.13-3.25-3.12-8.14-3.44-12.18-5.08-17.89-5.85-44.19-12.09-63.67-16.56l26.16 3.28c23.02 3.13 46.28 3.92 69.34 6.75 10.8.96 25.43 1.81 34.34-4.39 2.26-1.54 4.86-2.75 6.21-5.27 2.76-4.59 1.13-11.06-3.59-13.68Z"
                      fill="currentColor"
                    />
                  </motion.svg>
                </span>
              </h2>
              <p className="text-sm text-gray-600 max-w-3xl dark:text-gray-300">{t("dedicated.description")}</p>
            </div>
            <CurrencySelector
              selectedCurrency={selectedCurrency}
              onCurrencyChange={setSelectedCurrency}
              className="w-full sm:w-64 mt-4 sm:mt-0"
            />
          </div>
        </motion.div>

        {/* ── Filter panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-6"
        >
          {/* Filter toggle bar */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-tl-xl rounded-br-xl bg-gray-200 dark:bg-gray-800/40 border border-secondary text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700/40 transition-all duration-200 text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4 icon-primary" />
              Filtros
              {activeFilterCount > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs font-bold button-primary text-button-primary rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {activeFilterCount > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Limpiar filtros
              </button>
            )}
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                key="filters"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="p-4 sm:p-5 rounded-xl bg-white/80 dark:bg-gray-900/50 border border-secondary backdrop-blur-sm grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-5">

                  {/* Data Center */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2.5">Data Center</p>
                    <div className="flex flex-wrap gap-2">
                      {DC_OPTIONS.map((dc) => {
                        const active = filterDC.includes(dc.id)
                        return (
                          <button
                            key={dc.id}
                            onClick={() => toggle(filterDC, dc.id, setFilterDC)}
                            className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-tl-lg rounded-br-lg text-sm font-medium border transition-all duration-200 ${active
                                ? "button-primary text-button-primary border-primary shadow-sm"
                                : "bg-gray-100 dark:bg-gray-800/30 border-secondary text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/30"
                              }`}
                          >
                            <span>{dc.flag}</span>
                            <span>{dc.label}</span>
                            <span className="text-xs opacity-70">({dc.id})</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* CPU Brand */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2.5">CPU Brand</p>
                    <div className="flex gap-2">
                      {["AMD", "Intel"].map((brand) => {
                        const active = filterBrand.includes(brand)
                        return (
                          <button
                            key={brand}
                            onClick={() => toggle(filterBrand, brand, setFilterBrand)}
                            className={`cursor-pointer px-4 py-1.5 rounded-tl-lg rounded-br-lg text-sm font-semibold border transition-all duration-200 ${active
                                ? "button-primary text-button-primary border-primary shadow-sm"
                                : "bg-gray-100 dark:bg-gray-800/30 border-secondary text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/30"
                              }`}
                          >
                            {brand}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* CPU Model */}
                  <div className="relative">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2.5">CPU Model</p>
                    <button
                      onClick={() => setCpuModelOpen((v) => !v)}
                      className="cursor-pointer w-full flex items-center justify-between px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800/30 border border-secondary text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/30 transition-colors"
                    >
                      <span>
                        {filterCPUModels.length === 0
                          ? "Todos los modelos"
                          : `${filterCPUModels.length} seleccionado${filterCPUModels.length > 1 ? "s" : ""}`}
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${cpuModelOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {cpuModelOpen && (
                        <motion.div
                          key="cpuDropdown"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute z-30 top-full mt-1 w-full max-h-56 overflow-y-auto rounded-lg bg-white dark:bg-[#13141f] border border-secondary shadow-2xl"
                        >
                          {allCPUModels.map((model) => {
                            const active = filterCPUModels.includes(model)
                            return (
                              <button
                                key={model}
                                onClick={() => toggle(filterCPUModels, model, setFilterCPUModels)}
                                className={`cursor-pointer w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors ${active ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"
                                  }`}
                              >
                                <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${active ? "button-primary border-primary" : "border-gray-400"}`}>
                                  {active && <Check className="w-3 h-3 text-white" />}
                                </span>
                                {model}
                              </button>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* RAM */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2.5">RAM</p>
                    <div className="flex flex-wrap gap-2">
                      {RAM_OPTIONS.map((gb) => {
                        const active = filterRAM.includes(gb)
                        return (
                          <button
                            key={gb}
                            onClick={() => toggle(filterRAM, gb, setFilterRAM)}
                            className={`cursor-pointer px-3 py-1.5 rounded-tl-lg rounded-br-lg text-sm font-medium border transition-all duration-200 ${active
                                ? "button-primary text-button-primary border-primary shadow-sm"
                                : "bg-gray-100 dark:bg-gray-800/30 border-secondary text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/30"
                              }`}
                          >
                            {gb} GB
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Storage Type */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2.5">Tipo de Almacenamiento</p>
                    <div className="flex gap-2">
                      {STORAGE_TYPES.map((type) => {
                        const active = filterStorageType.includes(type)
                        return (
                          <button
                            key={type}
                            onClick={() => toggle(filterStorageType, type, setFilterStorageType)}
                            className={`cursor-pointer px-3 py-1.5 rounded-tl-lg rounded-br-lg text-sm font-medium border transition-all duration-200 ${active
                                ? "button-primary text-button-primary border-primary shadow-sm"
                                : "bg-gray-100 dark:bg-gray-800/30 border-secondary text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/30"
                              }`}
                          >
                            {type}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2.5">
                      Precio &mdash;{" "}
                      <span className="normal-case font-normal text-gray-700 dark:text-gray-200">
                        ${priceRange[0]} – ${priceRange[1]}/mo
                      </span>
                    </p>
                    <div className="flex gap-3 items-center">
                      <span className="text-xs text-gray-400">$0</span>
                      <input
                        type="range"
                        min={0}
                        max={800}
                        step={10}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                        className="flex-1 accent-purple-500 h-1.5 cursor-pointer"
                      />
                      <span className="text-xs text-gray-400">$800</span>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Results count ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-sm text-gray-500 dark:text-gray-400 mb-3"
        >
          Mostrando{" "}
          <span className="font-semibold text-gray-900 dark:text-white">{displayed.length}</span>{" "}
          de{" "}
          <span className="font-semibold text-gray-900 dark:text-white">{config.servers.length}</span>{" "}
          servidores
        </motion.p>

        {/* ── Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          {displayed.length > 0 ? (
            <div className="rounded-xl overflow-hidden border border-secondary bg-white/80 dark:bg-[#0d0e1a]/80 backdrop-blur-sm shadow-xl">
              {/* Table header */}
              <div className="hidden md:grid grid-cols-[2fr_1fr_2fr_1fr_1.2fr_1.2fr_1.8fr] gap-2 px-5 py-3 bg-gray-100/80 dark:bg-[#13141f]/90 border-b border-secondary">
                {[
                  { label: "CPU", field: "cpuName" as SortField },
                  { label: "RAM", field: "ram" as SortField },
                  { label: "STORAGE", field: "storageGB" as SortField },
                  { label: "BRAND", field: null },
                  { label: "STOCK", field: null },
                  { label: "PRICE", field: "price" as SortField },
                  { label: "", field: null },
                ].map(({ label, field }, i) => (
                  <div
                    key={i}
                    onClick={() => field && handleSort(field)}
                    className={`flex items-center text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 select-none ${field ? "cursor-pointer hover:text-gray-700 dark:hover:text-gray-200 transition-colors" : ""}`}
                  >
                    {label}
                    {field && <SortIcon field={field} sortField={sortField} sortDir={sortDir} />}
                  </div>
                ))}
              </div>

              {/* Table rows */}
              <div className="divide-y divide-gray-200/60 dark:divide-gray-800/60">
                <AnimatePresence mode="popLayout">
                  {displayed.map((server, index) => (
                    <motion.div
                      key={server.id}
                      layout
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      transition={{ duration: 0.2, delay: index * 0.025 }}
                      className="group hover:bg-gray-50/80 dark:hover:bg-[#13141f]/80 transition-colors duration-150"
                    >
                      {/* Desktop row */}
                      <div className="hidden md:grid grid-cols-[2fr_1fr_2fr_1fr_1.2fr_1.2fr_1.8fr] gap-2 px-5 py-4 items-center">
                        {/* CPU */}
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white text-base leading-tight">{server.cpuName}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{server.cpuCores}</p>
                        </div>
                        {/* RAM */}
                        <div className="text-base font-medium text-gray-700 dark:text-gray-200">
                          {server.ram} <span className="text-sm text-gray-500">GB</span>
                        </div>
                        {/* Storage */}
                        <div className="text-sm text-gray-700 dark:text-gray-200 leading-tight">
                          {server.storage}
                        </div>
                        {/* Brand */}
                        <div>
                          <span className={`inline-flex items-center px-2.5 py-1 rounded text-xs font-bold border ${server.cpuBrand === "AMD"
                              ? "bg-orange-500/10 text-orange-400 border-orange-500/30"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            }`}>
                            {server.cpuBrand}
                          </span>
                        </div>
                        {/* Stock */}
                        <div>
                          <StockBadge server={server} />
                        </div>
                        {/* Price */}
                        <div>
                          <span className="text-base font-bold text-gray-900 dark:text-white">
                            {convertPrice(server.price.toFixed(2))}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">/mo</span>
                        </div>
                        {/* Action — location dropdown */}
                        <div>
                          <OrderDropdown server={server} />
                        </div>
                      </div>

                      {/* Mobile card */}
                      <div className="md:hidden p-4 space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white text-base">{server.cpuName}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{server.cpuCores}</p>
                          </div>
                          <StockBadge server={server} />
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">RAM</p>
                            <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{server.ram} GB</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Storage</p>
                            <p className="font-medium text-gray-800 dark:text-gray-200 text-sm leading-tight">{server.storage}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Brand</p>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border ${server.cpuBrand === "AMD"
                                ? "bg-orange-500/10 text-orange-400 border-orange-500/30"
                                : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                              }`}>
                              {server.cpuBrand}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-1">
                          <div>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              {convertPrice(server.price.toFixed(2))}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">/mo</span>
                          </div>
                          <OrderDropdown server={server} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            // Empty state
            <div className="flex flex-col items-center justify-center py-20 px-4">
              <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-gray-100 dark:bg-gray-800/30 flex items-center justify-center">
                <Server className="w-10 h-10 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Sin resultados</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-5 text-center max-w-sm">
                Ningún servidor coincide con los filtros seleccionados. Prueba eliminando algunos filtros.
              </p>
              <button
                onClick={clearAll}
                className="px-5 py-2 button-primary text-button-primary rounded-lg text-sm font-medium"
              >
                Limpiar todos los filtros
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
