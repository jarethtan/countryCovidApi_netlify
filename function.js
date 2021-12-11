module.exports.numberCommas = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

module.exports.zoomSize = (area) => {
    if (area < 5000) return 9
    else if(area < 50000) return 7.2
    else if(area < 1200000) return 3.5
    else if(area < 3000000) return 2.7
    else if(area < 5000000) return 2.3
    else return 1.9
} 