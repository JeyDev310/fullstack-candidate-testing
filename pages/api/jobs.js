import jobs from '../../data/jobs'

export default async (req, res) => {
  const query = JSON.parse(req.body);
  res.statusCode = 200
  // @todo: implement filters and search
  // @todo: implement automated tests

  // this timeout emulates unstable network connection, do not remove this one
  // you need to figure out how to guarantee that client side will render
  // correct results even if server-side can't finish replies in the right order
  await new Promise((resolve) => setTimeout(resolve, 1000 * Math.random()))

  const searched = jobs.filter(job => {
    if (query.q) {
      return job.name.toLowerCase.includes(query.q.toLowerCase())
    }
    return true;
  })
  let sorted = searched

  const sortAry = (data, prop, isAsc) => {
    if (!data[prop])
      return data;

    return data.sort((a, b) => {
        return (a[prop] < b[prop] ? -1 : 1) * (isAsc ? 1 : -1)
    });
  }
  
  query.sorts.map(sort=> {
    sorted = sortAry(sorted, sort.key, sort.way == 'asc')
  })

  res.json(sorted)
}
