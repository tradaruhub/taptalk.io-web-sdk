const groupBy = (list, key) => list.reduce((hash, obj) => ({
    ...hash,
    [obj[key]]: obj,
}), {});

const safeJSON = (data) => {
    try {
        return JSON.parse(data);
    } catch (error) {
        return '';
    }
}

module.exports = { groupBy, safeJSON };