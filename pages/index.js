import React from 'react'
import Head from 'next/head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Content from '../components/Content'

// import Post from 'components/Post'

const IndexPage = ({ filters }) => {
  return (
    <div className="w-full flex flex-col bg-gray-100">
      <Head>
        <title>Full Test</title>
      </Head>
      
      <Nav/>
      <Content filters={filters} />
      <Footer/>
    </div>
  )
}

export async function getStaticProps() {
  // const getJobs = await fetch('http://localhost:3000/api/jobs')
  const getFilters = await fetch('http://localhost:3000/api/filters')
  // const jobs = await getJobs.json()
  const filters = await getFilters.json()

  return {
    props: { filters },
  }
}

export default IndexPage