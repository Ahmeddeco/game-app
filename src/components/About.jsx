import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const About = () => {
	/* ---------------------------------- gsap ---------------------------------- */
	useGSAP(() => {
		const clipAnimation = gsap.timeline({
			scrollTrigger: {
				trigger: '#clip',
				start: 'center center',
				end: '+=800 center',
				scrub: 0.5,
				pin: true,
				pinSpacing: true,
			},
		})
	})

	return (
		<section className='min-h-screen w-screen  '>
			<div className='relative mb-8 flex items-center flex-col gap-5'>
				<h2 className='font-general text-sm uppercase md:text-sm'>
					Welcome to Zentry
				</h2>
				<div className='mt-5 text-center text-4xl uppercase leading-[.8] md:text-8xl'>
					disc<b>o</b>ver the world's
					<br /> l<b>a</b>rgest shared adventure
				</div>
				<div className='about-subtext capitalize'>
					<p className=''>the game of begins-your lige, now an epic games </p>
					<p className=''>
						zentry unites every player from countless games and platforms
					</p>
				</div>
			</div>
			<div className='h-dvh w-screen' id='clip'>
				<div className='mask-clip-path about-image'>
					<img
						src='img/about.webp'
						alt='background'
						className='absolute left-0 top-0 size-full object-cover'
					/>
				</div>
			</div>
		</section>
	)
}

export default About
