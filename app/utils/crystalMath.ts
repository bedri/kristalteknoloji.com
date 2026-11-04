export type Point3D = [number, number, number]

export interface BrandColorSwatch {
  name: string
  hex: string
  rgb: { r: number; g: number; b: number }
}

/**
 * Official Kristal Teknoloji crystalline spectrum derived from the corporate logo (A28).
 */
export const KRISTAL_BRAND_COLORS: readonly BrandColorSwatch[] = Object.freeze([
  { name: 'Kristal Cyan (#00BED6)', hex: '#00bed6', rgb: { r: 0, g: 190, b: 214 } },
  { name: 'Buzul Cyan (#97D1DC)', hex: '#97d1dc', rgb: { r: 151, g: 209, b: 220 } },
  { name: 'Derin Spektrum (#008FA3)', hex: '#008fa3', rgb: { r: 0, g: 143, b: 163 } },
  { name: 'Titanyum Gri (#808284)', hex: '#808284', rgb: { r: 128, g: 130, b: 132 } }
])

/**
 * Rotates a 3D point [x, y, z] by pitch (angleX), yaw (angleY), and roll (angleZ).
 */
export function rotatePoint3D(p: Point3D, angleX: number, angleY: number, angleZ: number): Point3D {
  const [x, y, z] = p

  const cosY = Math.cos(angleY)
  const sinY = Math.sin(angleY)
  const x1 = x * cosY + z * sinY
  const z1 = -x * sinY + z * cosY

  const cosX = Math.cos(angleX)
  const sinX = Math.sin(angleX)
  const y2 = y * cosX - z1 * sinX
  const z2 = y * sinX + z1 * cosX

  const cosZ = Math.cos(angleZ)
  const sinZ = Math.sin(angleZ)
  const x3 = x1 * cosZ - y2 * sinZ
  const y3 = x1 * sinZ + y2 * cosZ

  return [x3, y3, z2]
}

/**
 * Generates the bipyramid crystal vertices for a given facet count and scale.
 */
export function generateBipyramidVertices(facets: number, radiusScale = 104, heightScale = 156): Point3D[] {
  const safeFacets = Math.max(3, Math.min(24, Math.floor(facets)))
  const vertices: Point3D[] = [
    [0, heightScale, 0],
    [0, -heightScale, 0]
  ]
  for (let i = 0; i < safeFacets; i++) {
    const angle = (2 * Math.PI * i) / safeFacets
    vertices.push([radiusScale * Math.cos(angle), 0, radiusScale * Math.sin(angle)])
  }
  return vertices
}

/**
 * Projects a 3D point onto a 2D viewport with perspective depth.
 */
export function projectPoint3D(
  v: Point3D,
  width: number,
  height: number,
  focalLength = 320,
  zOffset = 300
): Point3D {
  const denom = v[2] + zOffset
  const safeDenom = Math.abs(denom) < 1e-4 ? 1e-4 : denom
  const projX = (v[0] * focalLength) / safeDenom + width / 2
  const projY = (v[1] * focalLength) / safeDenom + height / 2
  return [projX, projY, v[2]]
}
