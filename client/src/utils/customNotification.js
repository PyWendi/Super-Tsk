import { Notify } from "quasar";

// Login notification
export const loginSuccess = (text) => {
    Notify.create({
        color: 'white',
        textColor: 'black',
        icon: 'cloud_done',
        iconColor: 'cyan-9',
        message: text,
        position:'bottom',
    })
}

export const loginWarning = (text) => {
    Notify.create({
        color: 'orange-4',
        textColor: 'white',
        icon: 'warning',
        message: text
    })
}

export const loginError = (text) => {
    Notify.create({
        color: 'red-5',
        textColor: 'white',
        icon: 'error',
        message: text
    })
}


// Form notification
export const requestSuccess = (text) => {
    Notify.create({
        color: 'white',
        textColor: 'cyan-10',
        icon: "task_alt",
        iconColor: 'cyan-10',
        message: text,
        position:'top',
    })
}

export const requestWarning = (text) => {
    Notify.create({
        color: 'white',
        textColor: 'orange-4',
        icon: 'warning',
        position: "top",
        message: text
    })
}

export const requestError = (text) => {
    Notify.create({
        color: 'white',
        textColor: 'red-5',
        icon: 'error',
        position: "top",
        message: text
    })
}