import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'


const labels = [
    'On wheels',
    'Box game',
    'Art',
    'Baby',
    'Doll',
    'Puzzle',
    'Outdoor',
    'Battery Powered'
]

// const reviews = [
//     {
//         _id: 'aAaAa',
//         username: 'Matilda',
//         txt: 'Great toy!',
//         createdAt: 1631531801011,
//         rate: 4
//     },
//     {
//         _id: 'bBbBb',
//         username: 'John',
//         txt: 'meh',
//         createdAt: 1631531801011,
//         rate: 2
//     },
//     {
//         _id: 'cCcCc',
//         username: 'Ben',
//         txt: 'A lot of fun',
//         createdAt: 1631531801011,
//         rate: 3
//     },
// ]

const TOY_KEY = 'toysDB'
const TOY_URL = 'toy/'

// function query() {
//     return storageService.queryWithDelay(TOY_KEY).then(toys => {
//         // console.log('toys:', toys)
//         if (!toys || !toys.length) {
//             toys = _createToys()
//             storageService.postMany(TOY_KEY, toys)
//         }
//         return toys
//     })
//     // return httpService.get(TOY_URL).then(res => res.data)
// }

// function save(toy) {
//     return toy._id ? _update(toy) : _add(toy)
// }

// function _add(addedToy) {
//     debugger
//     const newToy = _createToy({ ...addedToy })
//     return storageService.post(TOY_KEY, newToy)
//     // return axios.post(TOY_URL, addedToy).then(res => res.data)
// }

// function _update(updatedToy) {
//     // updatedToy.modifiedAt = Date.now()
//     return storageService.put(TOY_KEY, updatedToy)
//     // return axios.put(TOY_URL + updatedToy._id, updatedToy).then(res => res.data)
// }

// function remove(toyId) {
//     return storageService.remove(TOY_KEY, toyId)
//     // return axios.delete(TOY_URL + toyId).then(res => res.data)
// }

// function getById(toyId) {
//     return storageService.get(TOY_KEY, toyId)
//         .then(toy => {
//             const toyCopy = JSON.parse(JSON.stringify(toy))
//             toyCopy.reviews = reviews
//             return toyCopy
//         })
//     // return axios.get(TOY_URL + toyId).then(res => res.data)
// }

function query(filterBy = _getEmptyFilterBy()) {
    return httpService.get(TOY_URL, filterBy)
    // return storageService.query(KEY)
}

function getById(toyId) {
    return httpService.get(TOY_URL + toyId)
    // return storageService.get(KEY, toyId)
}

function remove(toyId) {
    return httpService.delete(TOY_URL + toyId)
    // return storageService.remove(KEY, toyId)
}

function save(toy) {
    if (toy._id) return httpService.put(TOY_URL + toy._id, toy)
    return httpService.post(TOY_URL, toy)
    // if (toy._id) return storageService.put(KEY, toy)
    // return storageService.post(KEY, toy)
}

export default {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getLabels
}

function getEmptyToy() {
    return {
        _id: '',
        name: '',
        price: 0,
        labels: [],
        createdAt: null,
        inStock: false
    }
}

function _getEmptyFilterBy() {
    return {
        txt: '',
        inStock: false,
        labels: [],
        sort: '',
    }
}

function getLabels() {
    return labels
}


function _createToys() {
    return [
        _createToy('Talking Doll', 123, ['Doll', 'Battery Powered', 'Baby'], 1631034561011, true),
        _createToy('Dinosaur', 50, ['Doll', 'Battery Powered'], 1631231801011, true),
        _createToy('Talisman', 100, ['Box game'], 1631031476011, false),
        _createToy('1000pc Sunset Puzzle', 149, ['Puzzle', 'Art'], 1631031798611, true),
        _createToy('Playdough', 15, ['Outdoor', 'Art', 'Baby'], 1631531801011, true),
        _createToy('G.I. Joe', 25, ['Doll', 'Battery Powered'], 1631036801011, false),
        _createToy('Racing Car', 35, ['On wheels', 'Battery Powered'], 1631071801011, true),
    ]
}

function _createToy(name, price, labels, createdAt, inStock) {
    return {
        _id: utilService.makeId(),
        name,
        price,
        labels,
        createdAt,
        inStock
    }
}