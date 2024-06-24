import React from 'react'
import Hero from '../../../components/client/Hero/Hero'
import BlogCards from './Blogscards/BlogCards'

const Blogs = () => {
  return (
    <main>
        <Hero text={"Blogs"}/>
        <BlogCards/>
    </main>
  )
}

export default Blogs