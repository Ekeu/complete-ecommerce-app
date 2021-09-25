export const colorIndex = (product, variant, color) => {
  return product.node.variants.indexOf(
    product.node.variants.filter(
      item =>
        item.color === color &&
        variant.gender === item.gender &&
        item.size === variant.size
    )[0]
  )
}

export const hasGender = product =>
  product.node.variants.some(variant => variant.gender !== null)
