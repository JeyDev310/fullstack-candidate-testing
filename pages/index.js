import React from 'react'
import Head from 'next/head'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Content from '../components/Content'

const IndexPage = ({ filters }) => {
  return (
    <div className="w-full flex flex-col bg-gray-100">
      <Head>
        <title>Full Test</title>
      </Head>
      
      <Nav/>
      <Content/>
      <Footer/>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {},
  }
}

export default IndexPage