module.exports = function() {
    this.isEmpty = function (body) {
        const isEmpty = (value) => (
            value === undefined ||
            value === null ||
            (typeof value === 'object' && Object.keys(value).length === 0) ||
            (typeof value === 'string' && value.trim().length === 0)
        )
        return isEmpty(body)
    }
    this.addWine = function (message) {

    }
}