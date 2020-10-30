groupBy = (list, key) => list.reduce((hash, obj) => ({
    ...hash,
    [obj[key]]: obj,
}), {});

module.exports = { groupBy };