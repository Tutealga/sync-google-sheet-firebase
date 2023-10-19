import { getData } from "./readData";
import Card from "./Card";

const Data = async () => {
    const res = await getData();

  return (
    <section>
  <article>
  {
      res.map(data => <Card key={data.id} data={data}/>)
  }
  </article>
    </section>
    )

}

export default Data
