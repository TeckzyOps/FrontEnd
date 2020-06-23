import Link from 'next/link'
import Layout from '../components/Layout'
import NavBar from '../components/navBar'
import React from 'react';


class IndexPage extends React.Component<{}, { isBoxVisible: boolean }> {
 
  constructor(props: Readonly<{}>){
    super(props);
  }

  render() {
   
    return (
      <Layout title="Home | Next.js + TypeScript Example">
        <NavBar />
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
    <button className="test mr-2 btn-primary btn">Primary</button>
    

  </Layout>
    )
  }
}

export default IndexPage
