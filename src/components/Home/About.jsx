import styles from '../../style';
import Button from './Button';

const About = () => {
	return (
		<section className={`pb-10`}>
			<div className = {`flex flex-row flex-wrap items-center content-center justify-center`}>
				<h2 className = {`${styles.heading2} text-center`}> About Us <br className = "sm:block hidden"/></h2>
				<p className={`font-poppins font-normal text-dimWhite text-[15px] leading-[30.8px] mt-5`}> William Chen and Bernard Kim first met at the University of Southern California their freshman year. Through college and their careers, they stayed connected through gaming, with late nights on Discord as they tried to extend their winstreaks. However, disruptive players would circumvent the updated text-filtering of different games as the feud between moderators and harmful users became an arms race. After an excessive night of toxic gamers, William and Bernard decided to build Osmosys AI in an attempt to make online interactions safer.</p>
				{/*<Button styles= "mt-10"/>*/}
			</div>
		</section>
	)
}

export default About