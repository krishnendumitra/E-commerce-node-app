let isArrayEmpty = (val) => {
    if (val === null || val === undefined || val.length === 0) {
        return true;
    } else {
        return false;
    }
}

let isEmpty = (val) => {
    if (val === null || val === undefined || val === '') {
        return true;
    } else {
        return false;
    }
}

let hasItem = (arr, item) => {
    if (arr.includes(item) === false) {
        return false;
    } else {
        return true;
    }
}


module.exports = {
    isEmpty: isEmpty,
    isArrayEmpty: isArrayEmpty,
    hasItem: hasItem
}