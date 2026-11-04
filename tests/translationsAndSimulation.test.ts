import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import {
  translations,
  isValidLocale,
  normalizeLocale,
  resolveTranslation
} from '../app/utils/translations.ts'
import {
  KRISTAL_BRAND_COLORS,
  rotatePoint3D,
  generateBipyramidVertices,
  projectPoint3D
} from '../app/utils/crystalMath.ts'
import {
  parseHexToken,
  computeXorDistance,
  findWinningValidator
} from '../app/utils/consensusLogic.ts'

function getLeafKeys(obj: Record<string, any>, prefix = ''): string[] {
  const keys: string[] = []
  for (const [k, v] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      keys.push(...getLeafKeys(v, fullKey))
    } else {
      keys.push(fullKey)
    }
  }
  return keys
}

describe('Translations, 3D Crystal Geometry & PoBLS Consensus Logic', () => {
  describe('Translations & i18n Security', () => {
    it('validates and normalizes locale codes safely', () => {
      assert.equal(isValidLocale('tr'), true)
      assert.equal(isValidLocale('en'), true)
      assert.equal(isValidLocale('fr'), false)
      assert.equal(isValidLocale('__proto__'), false)
      assert.equal(normalizeLocale('en'), 'en')
      assert.equal(normalizeLocale('invalid'), 'tr')
    })

    it('maintains 100% key parity between Turkish (tr) and English (en) dictionaries', () => {
      const trKeys = getLeafKeys(translations.tr).sort()
      const enKeys = getLeafKeys(translations.en).sort()
      assert.deepEqual(trKeys, enKeys)
    })

    it('resolves translations in both TR and EN and falls back safely', () => {
      assert.equal(resolveTranslation('nav.home', 'tr'), 'Giriş')
      assert.equal(resolveTranslation('nav.home', 'en'), 'Home')
      assert.equal(resolveTranslation('nonexistent.key.path', 'en'), 'nonexistent.key.path')
      assert.equal(resolveTranslation('', 'tr'), '')
    })

    it('prevents Object.prototype pollution lookups on translation keys', () => {
      assert.equal(resolveTranslation('__proto__.toString', 'tr'), '__proto__.toString')
      assert.equal(resolveTranslation('constructor.prototype', 'en'), 'constructor.prototype')
      assert.equal(resolveTranslation('toString', 'tr'), 'toString')
    })
  })

  describe('3D Crystal Geometry & Brand Spectrum', () => {
    it('defines only official Kristal Teknoloji corporate colors in KRISTAL_BRAND_COLORS', () => {
      const hexes = KRISTAL_BRAND_COLORS.map(c => c.hex.toLowerCase())
      assert.deepEqual(hexes, ['#00bed6', '#97d1dc', '#008fa3', '#808284'])
    })

    it('preserves Euclidean distance (vector norm) under 3D rotation', () => {
      const original: [number, number, number] = [30, -40, 120]
      const originalNorm = Math.hypot(...original)
      const rotated = rotatePoint3D(original, 0.7, -1.2, 0.4)
      const rotatedNorm = Math.hypot(...rotated)
      assert.ok(Math.abs(originalNorm - rotatedNorm) < 1e-9)
    })

    it('generates facets + 2 bipyramid vertices and projects origin to canvas center', () => {
      const vertices = generateBipyramidVertices(6, 100, 150)
      assert.equal(vertices.length, 8)
      const projectedOrigin = projectPoint3D([0, 0, 0], 400, 400, 320, 300)
      assert.equal(projectedOrigin[0], 200)
      assert.equal(projectedOrigin[1], 200)
    })
  })

  describe('PoBLS Consensus Lottery Logic', () => {
    it('parses hex tokens and computes zero XOR distance for identical seeds', () => {
      assert.equal(parseHexToken('0x000000ff...'), 255)
      assert.equal(computeXorDistance('0x762ee7ab...', '0x762ee7ab...'), 0)
      assert.equal(
        computeXorDistance('0x123456...', '0xabcdef...'),
        computeXorDistance('0xabcdef...', '0x123456...')
      )
    })

    it('selects the active validator with minimum XOR distance and ignores inactive nodes', () => {
      const nodes = [
        { id: 1, name: 'Inactive-Zero', isActive: false, distance: 0 },
        { id: 2, name: 'Active-Far', isActive: true, distance: 9000 },
        { id: 3, name: 'Active-Closest', isActive: true, distance: 120 },
        { id: 4, name: 'Active-Mid', isActive: true, distance: 450 }
      ]
      const winner = findWinningValidator(nodes)
      assert.ok(winner)
      assert.equal(winner.id, 3)
      assert.equal(winner.name, 'Active-Closest')
    })
  })
})
