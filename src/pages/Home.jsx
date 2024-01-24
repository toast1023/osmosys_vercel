import React from 'react'
import styles from '../style';
import { Billing,CardDeal,Business,Clients,CTA,Stats,Footer,Testimonials,Hero, About, Founders } from '../components/Home';


const Home = () => {
  return (
    <div>
      <div className = {`bg-primary ${styles.flexStart}`}>
        <div className = {`${styles.boxWidth}`}>
          <Hero/>
        </div>
      </div> 

      <div className = {`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
        <div className = {`${styles.boxWidth}`}>
          <Stats/>
          <Business/>
          <About/>
          <Founders/>
{/*          <Billing/>
          <CardDeal/>
          <Testimonials/>
          <Clients/>
          <CTA/>*/}
          <Footer/>
        </div>
      </div> 
    </div>
  )
}

export default Home