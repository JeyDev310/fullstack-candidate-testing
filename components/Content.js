import React from 'react'
import * as moment from 'moment'
import { debounce } from "lodash";

const Content = () => {
  const [filters, setFilters] = React.useState([]);
  const [jobs, setJobs] = React.useState([]);
  const [searchKey, setSearchKey] = React.useState(''); 
  const [selectedJob, selectJob] = React.useState(null);
  const [selectedJobItem, selecteJobItem] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [filterItems, updateFilterItems] = React.useState([
    {title: "Job Type", key: "job_type", showMore: true },
    {title: "Department", key: "department", showMore: true },
    {title: "Work Schedule", key: "work_schedule", showMore: true },
    {title: "Experience", key: "experience", showMore: true },    
  ])
  const [sortItems, updateSortItems] = React.useState([
    {title: "Location", key: 'location', way: ''},
    {title: "Role", key: 'role', way: 0},
    {title: "Department", key: 'department', way: ''},
    {title: "Education", key: 'education', way: ''},
    {title: "Experience", key: 'experience', way: ''},

  ])

  React.useEffect(() => {
    fetchFilters()
  }, []);

  React.useEffect(() => {
    fetchJobs()
  }, [searchKey, sortItems]);

  const onClickJob = (index) => {
    selectJob(selectedJob == index ? null : index)
  }

  const onClickJobItem = (index) => {
    selecteJobItem(selectedJobItem == index ? null : index)
  }

  const onClickFilterShowMore = (index) => {
    filterItems[index].showMore = !filterItems[index].showMore
    updateFilterItems([...filterItems])
  }

  const onChangeSearchKey = (key) => {
    setSearchKey(key)
  }

  const onClickSortArrow = (index) => {
    switch (sortItems[index].way) {
      case '': {
        sortItems[index].way = 'asc';
        break;
      }
      case 'asc': {
        sortItems[index].way = 'desc';
        break;
      }
      case 'desc': {
        sortItems[index].way = '';
        break;
      }
      default: sortItems[index].way = '';
    }
    updateSortItems([...sortItems])
  }

  const reduceWithShowMore = (showMore, ary) => {
    if (!showMore) {
      return ary;
    }
    return ary.slice(0, Math.min(ary.length, 10))
  }

  const fetchFilters = async () => {
    const apiBaseURL = window.location.href;

    const getFilters = await fetch(apiBaseURL+'api/filters')
    const filtersData = await getFilters.json()
    setFilters(filtersData)
  }
  const fetchJobs = async () => {
    const apiBaseURL = window.location.href;

    const data = {
      q: searchKey,
      sorts: sortItems.filter(item => item.way != '')
    }
    const getJobs = await fetch(apiBaseURL+'api/jobs',
    {
      method: 'POST',
      body: JSON.stringify(data)
    })

    const jobs = await getJobs.json()
    setJobs(jobs)
  }

  const DepartmentModal = () => {
    const department = filters['department']
    return (
      <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-center justify-between p-4 border-b border-solid border-gray-300 rounded-t">
                <h3 className="text-xl font-semibold">
                  Department
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto grid grid-cols-4">
                {
                  department.map((item, index) => {
                    return (
                      <div className="mb-1" key={'filter-item' + index}>
                        {item.key}
                        <span className="text-sm text-gray-400 ml-1">{new Intl.NumberFormat().format(item.doc_count)}</span>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    )
  }

  return (
    <div className="flex flex-col bg-gray-100 p-4">
      <div className="flex bg-white py-2 px-4 mb-2 shadow rounded">
        <img src="/search.svg" className="h-8"/>
        <input className="flex-grow outline-none ml-2" placeholder="Search for any job, title, keywords or company" onChange={(e) => onChangeSearchKey(e.target.value)} ></input>
      </div>
      <div className="flex mt-2">
        <div className="w-72 flex-grow-0 flex-shrink-0 hidden md:flex flex-col mr-4">
          {
            filters && filterItems && filterItems.map((item, index) => {
              return (
                <div className="p-4 mb-4 bg-white shadow rounded" key={'filter'+index}>
                  <div className="text-base font-bold mb-2 uppercase">
                    {item.title}
                  </div>
                  {
                    filters[item.key] && reduceWithShowMore(item.showMore, filters[item.key]).map((item, index) => {
                      return (
                        <div className="mb-1" key={'filter-item' + index}>
                          {item.key}
                          <span className="text-sm text-gray-400 ml-1">{new Intl.NumberFormat().format(item.doc_count)}</span>
                        </div>
                      )
                    })
                  }
                  {
                    filters[item.key] && filters[item.key].length > 10 && (
                      <div className="text-sm text-blue-400 cursor-pointer" onClick={()=>onClickFilterShowMore(index)}>
                        {item.showMore ? 'Show More':'Less More'}
                      </div>
                    )
                  }
                </div>
              )
            })
          }
        </div>
        <div className="bg-white shadow rounded flex flex-col flex-grow p-6">
          <div className="flex justify-between mb-8">
            <div>
              <span className="font-bold mr-2">{jobs.length}</span>job postings
            </div>
            <div className="hidden md:flex space-x-4">
              <span className="text-gray-400">Sort by</span>
              {
                sortItems.map((item, index) => {
                  return (
                    <button className="focus:outline-none flex items-center" key={'sort-'+index} onClick={()=>onClickSortArrow(index)}>
                      {item.title}
                      {item.way == 'asc' && <img src="/up-arrow.svg" className="h-3"/>}
                      {item.way == 'desc' && <img src="/down-arrow.svg" className="h-3"/>}
                    </button>
                  )
                })
              }
            </div>
          </div>
          <div className="flex flex-col">
            {
              jobs.map((job, index) => {
                return (
                  <div className="m-2" key={'job-'+index}>
                    <div className="flex items-center cursor-pointer" onClick={()=>onClickJob(index)}>
                      <div className="w-8 h-8 mr-2 rounded-md bg-gray-400 text-white font-bold txt-lg flex justify-center items-center uppercase">{job.name.slice(0,2)}</div>
                      <span>{job.items.length} jobs for {job.name}</span>
                    </div>
                    {
                      index == selectedJob &&
                      job.items.map((item, index) => {
                        return (
                          <div className="m-2" key={'job-item-' +index}>
                            <div className="border-t py-3 cursor-pointer" onClick={()=>onClickJobItem(index)}>
                              <div className="flex justify-between">
                                <span className="font-bold">{job.job_title}</span>
                                <span>{moment(item.created).fromNow()}</span>
                              </div>
                              <div>
                                {item.job_type} | ${item.salary_range[0]} - ${item.salary_range[1]} an hours | {item.city}
                              </div>
                            </div>
                            {
                              index == selectedJobItem && (
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                                  <div className="col-span-1 md:col-span-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                      <div className="font-bold text-sm">
                                        Department:
                                      </div>
                                      <div>
                                        {item.department.join(',')}
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                      <div className="font-bold text-sm">
                                        Hours / shifts:
                                      </div>
                                      <div>
                                        {item.hours[0]} hours / {item.work_schedule}
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2">
                                      <div className="font-bold text-sm">
                                        Summary
                                      </div>
                                      <div>
                                        {item.description}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-span-1 flex md:flex-col items-end">
                                    <button className="m-1 p-1 text-sm rounded border border-blue-400 bg-blue-400 text-white focus:outline-none hover:border-blue-600"
                                      onClick={() => setShowModal(true)}>Job Details</button>
                                    <button className="m-1 p-1 text-sm rounded border border-blue-400 text-blue-400 focus:outline-none hover:border-blue-600">Save Job</button>
                                  </div>
                                </div>
                              )
                            }
                          </div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      {showModal ? (
        <DepartmentModal/>
      ) : null}
    </div>
  )
}

export default Content