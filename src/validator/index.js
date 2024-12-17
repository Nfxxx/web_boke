export const isAcountID = function (value) {
    
    const AcountIdPattern = /^\d*\.?\d+$/

    return AcountIdPattern.test(value)
}