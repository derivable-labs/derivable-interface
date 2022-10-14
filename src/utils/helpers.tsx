import {utils} from 'ethers';

export const shortenAddressString = (address: string) => {
    return address.slice?.(0, 6) + '...' + address.slice?.(address.length - 4, address.length)
}

export const weiToNumber = (wei: string, decimal: number = 18) => {
    let number = utils.formatUnits(wei, decimal)
    let arr = number.split('.')
    if (arr.length > 0) {
        arr[1] = arr[1].slice(0, 4)
    }
    number = arr.join('.')
    return number.slice(-2) === '.0' ? number.slice(0, -2) : number
}

export const getResourceUrl = (name: string) => {
    return process.env.REACT_APP_WHITE_LABEL_CONFIG_URL + '/sites/' + window.location.hostname + '/' + name
}
