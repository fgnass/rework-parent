module.exports = function(sheet, rework) {

  // Selectors indexed by nesting level
  var selectors = []

  sheet.rules.forEach(function visit(rule) {

    // Visit nested nodes
    if (rule.rules) rule.rules.forEach(visit)

    // Skip nodes that don't have selectors
    if (!rule.selectors) return

    var newSels = []

    rule.selectors.forEach(function(sel) {

      var m = /&+/.exec(sel)
        , level = m && m[0].length || 0

      var prev = selectors[level]
      if (!prev || prev.rule != rule) {
        prev = selectors[level] = { rule: rule, sel: [] }
      }

      var resolved
      if (!level) resolved = [sel]
      else {
        var parent = selectors[level-1]
        if (!parent) {
          console.log('Invalid parent selector')
          //TODO: Figure out a good way to report errors
          //IDEA: Flag node as invalid by setting rule.error to the error msg
          // Write plugin that collects invalid nodes and outputs an alert box
          // as pseudo element (body:before)
        }
        resolved = parent.sel.map(function(p) {
          return sel.replace(/&+/, p)
        })
      }

      resolved.forEach(function(sel) {
        newSels.push(sel)
        prev.sel.push(sel)
      })

    })
    rule.selectors = newSels
  })
}