import { SET_PRINTER, SET_SHOW_LIGHTBOX, SET_IMAGES_LIGHTBOX, SET_INDEX_LIGHTBOX, SET_LEGALOBJECT, SET_WORK_SHIFT, SET_BRANCH, SET_CASHBOX, SET_CLIENT, SET_CASHIER, SHOW_APPBAR, SHOW_DRAWER, SET_SEARCH, SET_FILTER, SET_SORT, SET_IS_MOBILE_APP, SHOW_LOAD, SET_DATE } from '../constants/app'

export function setShowLightbox(data) {
    return {
        type: SET_SHOW_LIGHTBOX,
        payload: data
    }
}

export function setPrinter(data) {
    return {
        type: SET_PRINTER,
        payload: data
    }
}

export function setImagesLightbox(data) {
    return {
        type: SET_IMAGES_LIGHTBOX,
        payload: data
    }
}

export function setIndexLightbox(data) {
    return {
        type: SET_INDEX_LIGHTBOX,
        payload: data
    }
}

export function setLegalObject(data) {
    return {
        type: SET_LEGALOBJECT,
        payload: data
    }
}

export function setWorkShift(data) {
    return {
        type: SET_WORK_SHIFT,
        payload: data
    }
}

export function setBranch(data) {
    return {
        type: SET_BRANCH,
        payload: data
    }
}

export function setCashbox(data) {
    return {
        type: SET_CASHBOX,
        payload: data
    }
}

export function setClient(data) {
    return {
        type: SET_CLIENT,
        payload: data
    }
}

export function setCashier(data) {
    return {
        type: SET_CASHIER,
        payload: data
    }
}

export function setShowAppBar(data) {
    return {
        type: SHOW_APPBAR,
        payload: data
    }
}

export function showDrawer(data) {
    return {
        type: SHOW_DRAWER,
        payload: data
    }
}

export function setFilter(data) {
    return {
        type: SET_FILTER,
        payload: data
    }
}

export function setDate(data) {
    return {
        type: SET_DATE,
        payload: data
    }
}

export function setSort(data) {
    return {
        type: SET_SORT,
        payload: data
    }
}

export function setSearch(data) {
    return {
        type: SET_SEARCH,
        payload: data
    }
}

export function setIsMobileApp(data) {
    return {
        type: SET_IS_MOBILE_APP,
        payload: data
    }
}

export function showLoad(show) {
    return {
        type: SHOW_LOAD,
        payload: show
    }
}