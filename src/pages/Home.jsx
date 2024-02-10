import React from 'react'
import styles from '../style';
import { Billing,CardDeal,Business,Clients,CTA,Stats,Footer,Testimonials,Hero, About, Founders } from '../components/Home';
import CookieConsent from "react-cookie-consent";


const Home = () => {
  return (

    <div>
      <div className = {`bg-primary ${styles.flexStart}`}>
        <div className = {`${styles.boxWidth}`}>
          <Hero/>
        </div>
      </div> 
      <CookieConsent
        enableDeclineButton
        flipButtons
        onDecline={() => {}}
        style={{background: "black",textAlign:"center", padding:"0.2em"}}
        buttonStyle = {{background: "#2bfff8", borderRadius:"4px"}}
        declineButtonStyle = {{borderRadius:"4px"}}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>

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