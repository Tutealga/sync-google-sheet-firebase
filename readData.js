import {rdb} from "../firebase/firebase"
import {get, ref, child} from "firebase/database"

export const getProducts = async () => {
 const db = ref(rdb)

 const response = await get(child(db, '/'))
 const data = await response.val()
 return data
}
