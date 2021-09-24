export const colorIndex = (product, variant, color) => {
  return product.node.variants.indexOf(
    product.node.variants.filter(
      item => item.color === color && variant.gender === item.gender
    )[0]
  )
}
