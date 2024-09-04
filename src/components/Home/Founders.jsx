import styles from '../../style';
import {Beom, Will} from '../../assets';


const Founders = () => {
	return (
		<section>
			<div className={`flex flex-row flex-wrap grid grid-cols-1 md:grid-cols-2 gap-4 grid-flow-row items-center`}>
			    <div className ={`text-center content-center`}>
			    	<img src= {Beom} className="w-[50%] mx-auto"alt="Bernard Kim"/>
			    	<p className = {`text-dimWhite text-[40px]`}> Bernard Kim</p>
			    	<p className = {`text-dimWhite text-[20px]`}> Co-Founder</p>
			    </div>
			</div>
		</section>
	)
}

export default Founders
