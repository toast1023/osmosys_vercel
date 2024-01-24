import {useState} from 'react'
import { close, logo , menu } from '../../assets';
import { navLinks } from '../../constants';
import { Link } from 'react-router-dom'

const Navbar = () => {
	const [toggle, setToggle] = useState(false);

	return (
		<nav className= "w-full flex py-6 justify-between items-center navbar">
			<img src = {logo} alt="osmosys" className = "w-[200px]"/>
			<ul className = "list-none sm:flex hidden justify-end items-center flex-1">
				{navLinks.map((nav, index) => (
					<li 
						key = {nav.id}
						className = {`font-poppins font-normal cursor-pointer text-[16px] ${index===navLinks.length - 1 ? 'mr-0':'mr-10'} text-white`}
					>
						<Link className={`hover:text-gray-400`} to = {`/${nav.id}`}>
							{nav.title}
						</Link>
					</li>

				))}
			</ul>

			<div className = "sm:hidden flex flex-1 justify-end items-center">
				<img 
					src={toggle ? close : menu}
					alf="menu"
					className="w-[28x] h-[28px] object-contain"
					onClick = {() => setToggle((prev) => !prev)}
				/>
				<div 
					className = {`${toggle ? 'flex' : 'hidden'} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-x1 sidebar`}>
					<ul className = "list-none flex flex-col justify-end items-center flex-1">
						{navLinks.map((nav, index) => (
							<li 
								key = {nav.id}
								className = {`font-poppins font-normal cursor-pointer text-[16px] ${index===navLinks.length - 1 ? 'mr-0':'mb-4'} text-white`}
							>
								<Link to = {`/${nav.id}`}>
									{nav.title}
								</Link>
							</li>

						))}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default Navbar