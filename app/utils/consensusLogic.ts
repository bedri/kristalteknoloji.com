export interface ValidatorNode {
  id: number
  name: string
  role: string
  ticket: string
  distance: number | null
  isActive: boolean
  isWinner: boolean
}

export interface SimulationLogEntry {
  time: string
  type: 'system' | 'alert' | 'winner'
  message: string
  highlight?: string
  suffix?: string
}

/**
 * Parses a hex seed or ticket string (e.g. "0x762ee7ab...") into an unsigned 32-bit integer.
 */
export function parseHexToken(hexStr: string, fallback = 0): number {
  if (typeof hexStr !== 'string') return fallback
  const cleaned = hexStr.trim().replace(/^0x/i, '').replace(/[^0-9a-fA-F]/g, '')
  if (!cleaned) return fallback
  const parsed = Number.parseInt(cleaned.slice(0, 8), 16)
  return Number.isNaN(parsed) ? fallback : parsed >>> 0
}

/**
 * Computes the unsigned 32-bit XOR distance between a validator ticket and target seed.
 */
export function computeXorDistance(ticketHex: string, targetHex: string): number {
  const ticketVal = parseHexToken(ticketHex, 54321)
  const targetVal = parseHexToken(targetHex, 12345)
  return (ticketVal ^ targetVal) >>> 0
}

/**
 * Selects the active validator with the minimum XOR distance as the block proposer.
 */
export function findWinningValidator<T extends { isActive: boolean; distance: number | null }>(
  validators: readonly T[]
): T | null {
  let winner: T | null = null
  let minDistance = Infinity

  for (const v of validators) {
    if (v.isActive && typeof v.distance === 'number' && !Number.isNaN(v.distance)) {
      if (v.distance < minDistance) {
        minDistance = v.distance
        winner = v
      }
    }
  }

  return winner
}
