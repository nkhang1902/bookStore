import React from 'react'
import Home from './pages/Home'
import BookDetails from './pages/BookDetails/BookDetails'
import Layout from './layout/Layout'

const App = () => {
  return (<div><Layout>
      <Home/>
    </Layout></div>);
}

export default App