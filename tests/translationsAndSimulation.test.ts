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

    it('synchronizes all KRISTA Core v1.5.9.0 (Proto 70983) protocol specifications across TR and EN', () => {
      assert.ok(resolveTranslation('home.masternodeCollateral', 'tr').includes('4.200 KRISTA'))
      assert.ok(resolveTranslation('home.masternodeCollateral', 'en').includes('4,200 KRISTA'))
      assert.ok(resolveTranslation('home.adam.desc', 'tr').includes('7+1+3'))
      assert.ok(resolveTranslation('home.adam.desc', 'tr').includes('4.200:250:10'))
      assert.ok(resolveTranslation('home.adam.desc', 'tr').includes('orantılı'))
      assert.ok(resolveTranslation('home.adam.desc', 'tr').includes('ADAM_FAIR_COORD_V4'))
      assert.ok(resolveTranslation('home.adam.desc', 'en').includes('17 uniform'))
      assert.ok(resolveTranslation('home.adam.desc', 'en').includes('Proportional'))
      assert.ok(resolveTranslation('home.adam.desc', 'en').includes('ADAM_FAIR_COORD_V4'))
      assert.ok(resolveTranslation('home.pobls.desc', 'tr').includes('KTDIP3'))
      assert.ok(resolveTranslation('home.pobls.desc', 'tr').includes('wallet.dat'))
      assert.ok(resolveTranslation('home.pobls.desc', 'tr').includes('BIP324'))
      assert.ok(resolveTranslation('home.pobls.desc', 'en').includes('KTDIP3'))
      assert.ok(resolveTranslation('home.pobls.desc', 'en').includes('wallet.dat'))
      assert.ok(resolveTranslation('home.pobls.desc', 'en').includes('BIP324'))
      assert.ok(resolveTranslation('home.mescal.desc', 'tr').includes('MESCAL v2'))
      assert.ok(resolveTranslation('home.mescal.desc', 'tr').includes('kt1p'))
      assert.ok(resolveTranslation('home.mescal.desc', 'tr').includes('BIP174 PSBT'))
      assert.ok(resolveTranslation('home.mescal.desc', 'tr').includes('250 KRISTA'))
      assert.ok(resolveTranslation('home.mescal.desc', 'tr').includes('10 KRISTA'))
      assert.ok(resolveTranslation('home.mescal.desc', 'en').includes('MESCAL v2'))
      assert.ok(resolveTranslation('home.mescal.desc', 'en').includes('kt1p'))
      assert.ok(resolveTranslation('home.mescal.desc', 'en').includes('BIP174 PSBT'))
      assert.ok(resolveTranslation('home.mescal.desc', 'en').includes('250 KRISTA'))
      assert.ok(resolveTranslation('home.mescal.desc', 'en').includes('10 KRISTA'))
      assert.ok(resolveTranslation('lab.tech.adam.spec1Val', 'tr').includes('7+1+3'))
      assert.ok(resolveTranslation('lab.tech.adam.spec3Val', 'tr').includes('Orantılı'))
      assert.ok(resolveTranslation('lab.tech.adam.spec3Val', 'en').includes('4,200:250:10'))
      assert.ok(resolveTranslation('lab.tech.adam.spec3Val', 'en').includes('Proportional'))
      assert.ok(resolveTranslation('lab.tech.pobls.spec1Val', 'en').includes('KTDIP3 BLS12-381'))
      assert.ok(resolveTranslation('lab.tech.pobls.spec1Val', 'en').includes('BIP324'))
      assert.ok(resolveTranslation('lab.tech.modelD.desc', 'tr').includes('17 KRISTA'))
      assert.ok(resolveTranslation('lab.tech.modelD.desc', 'tr').includes('PoM 1.25x'))
      assert.ok(resolveTranslation('lab.tech.modelD.desc', 'tr').includes('PoL 3x'))
      assert.ok(resolveTranslation('lab.tech.modelD.desc', 'tr').includes('PoB 6x'))
      assert.ok(resolveTranslation('lab.tech.modelD.desc', 'tr').includes('600'))
      assert.ok(resolveTranslation('lab.tech.modelD.desc', 'en').includes('17 KRISTA'))
      assert.ok(resolveTranslation('lab.tech.modelD.desc', 'en').includes('PoM 1.25x'))
      assert.ok(resolveTranslation('lab.tech.modelD.desc', 'en').includes('PoL 3x'))
      assert.ok(resolveTranslation('lab.tech.modelD.desc', 'en').includes('PoB 6x'))
      assert.ok(resolveTranslation('lab.tech.modelD.desc', 'en').includes('600'))
      assert.ok(resolveTranslation('lab.tech.modelD.spec2Val', 'tr').includes('%35'))
      assert.ok(resolveTranslation('lab.tech.modelD.spec2Val', 'en').includes('35%'))
      assert.ok(resolveTranslation('lab.tech.modelD.spec3Val', 'tr').includes('%50'))
      assert.ok(resolveTranslation('lab.tech.modelD.spec3Val', 'en').includes('50%'))

      const serialized = JSON.stringify(translations)
      assert.equal(serialized.includes('karekök'), false)
      assert.equal(serialized.includes('Quadratic'), false)
      assert.equal(serialized.includes('quadratic'), false)
      assert.equal(serialized.includes('cscript_sandbox'), false)
      assert.equal(serialized.includes('Velvet Bridge'), false)
      assert.equal(serialized.includes('2.100 KRISTA'), false)
      assert.equal(serialized.includes('2,100 KRISTA'), false)
      assert.equal(serialized.includes('13 dinamik'), false)
      assert.equal(serialized.includes('13 dynamic'), false)
      assert.equal(serialized.includes('18 dinamik'), false)
      assert.equal(serialized.includes('18 dynamic'), false)
      assert.equal(serialized.includes('65:16:4'), false)
      assert.equal(serialized.includes('65:8:2'), false)
      assert.equal(serialized.includes('v1.5.7.0'), false)
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
