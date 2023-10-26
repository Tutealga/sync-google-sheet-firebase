import {rdb} from "../firebase/firebase"
import {get, ref, child} from "firebase/database"

const getData = async () => {
 const db = ref(rdb)

 const response = await get(child(db, 'your_spread_sheet_id/spread_sheet_name'))
 const data = await response.val()
 return data
}

const Data = async () => {
    const res = await getData();

  return (
    <section>
  <article>
  {
      res.map(data => <Card key={data.id} data={data} />)
  }
  </article>
    </section>
    )

}

export default Data
