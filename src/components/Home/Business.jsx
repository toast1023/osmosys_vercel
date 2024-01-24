import { features } from '../../constants';
import styles, { layout } from '../../style';
import Button from './Button';
import { discord } from "../../assets";


const Business = () => {
	return (
		<section id="features" className = {layout.section}>
			<div className = {`flex flex-col items-center lg:items-start justify-normal lg:justify-center`}>
				<h2 className = {`${styles.heading2} text-center lg:text-left`}> Content moderation <br className = "sm:block hidden"/> made easy</h2>
				<p className={`${styles.paragraph} max-w-[470px] mt-5 text-center lg:text-left`}> With our automated content moderation, manual parsing of content no longer necessary. </p>
				<p className={`${styles.paragraph} max-w-[470px] mt-5 text-center lg:text-left`}> Available on Discord now! </p>
				<Button styles= "mt-10"/>
			</div>
			<div className="my-auto pt-10">
				<img
					src={discord}
					alt="Discord logo"
					className="w-[75%] mx-auto"
				/>
			</div>
		</section>
	)
}

export default Business