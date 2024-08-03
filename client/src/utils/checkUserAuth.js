import { Cookies } from "quasar"

export const checkUserAuth = () => {
    return Cookies.has("token")
}