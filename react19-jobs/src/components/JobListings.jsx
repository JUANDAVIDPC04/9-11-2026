import JobListing from './JobListing'
import { useState, useEffect } from 'react'
import Spinner from './Spinner'

const JobListings = ({ ishome = false }) => {
  const [jobs, setJobs] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobs')
        const data = await res.json()
        const jobsArray = Array.isArray(data)
          ? data
          : Array.isArray(data?.data)
            ? data.data
            : []

        setJobs(ishome ? jobsArray.slice(0, 3) : jobsArray)
      } catch (error) {
        console.log('Error al cargar los datos:', error)
        setJobs([])
      } finally {
        setCargando(false)
      }
    }

    fetchJobs()
  }, [ishome])

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {ishome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>
        {cargando ? (
          <Spinner loading={cargando} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default JobListings