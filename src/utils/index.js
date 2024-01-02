export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function convertToTree(data, parentId = null) {
  const tree = []
  data.forEach(item => {
    if (item.parentId === parentId) {
      const children = convertToTree(data, item.id)
      if (children.length > 0) {
        item.children = children
      }
      tree.push(item)
    }
  })
  return tree
}