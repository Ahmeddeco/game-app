import { useRef, useState, useEffect } from 'react'
import Button from './Button'
import { TiLocationArrow } from 'react-icons/ti'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

const Hero = () => {
	/* -------------------------------- useState -------------------------------- */

	const [currenIndex, setCurrenIndex] = useState(1)
	const [hasClicked, setHasClicked] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [loadedVideos, setLoadedVideos] = useState(0)

	/* -------------------------------- functions -------------------------------- */

	const totalVideos = 4
	const nextVideoRef = useRef(null)
	const upcomingVideoIndex = (currenIndex % totalVideos) + 1

	const handelVidoeLoad = () => {
		setLoadedVideos((prev) => prev + 1)
	}

	const getVideoSrc = (index) => `videos/hero-${index}.mp4`

	const handelMiniVideoClick = () => {
		setHasClicked(true)
		setCurrenIndex(upcomingVideoIndex)
	}

	/* -------------------------------- useEffect ------------------------------- */

	useEffect(() => {
		if (loadedVideos === totalVideos - 1) {
			setIsLoading(false)
		}
	}, [loadedVideos])

	/* ---------------------------------- gsap ---------------------------------- */

	gsap.registerPlugin(ScrollTrigger)

	useGSAP(
		() => {
			if (hasClicked) {
				gsap.set('#next-video', { visibility: 'visible' })

				gsap.to('#next-video', {
					transformOrigin: 'center center',
					scale: 1,
					width: '100%',
					height: '100%',
					duration: 1,
					ease: 'power1.inOut',
					onStart: () => nextVideoRef.current.play(),
				})

				gsap.from('#cuttent-video', {
					transformOrigin: 'center center',
				})
			}
		},
		{ dependencies: [currenIndex], revertOnUpdate: true }
	)

	useGSAP(() => {
		gsap.set('#video-frame', {
			clipPath: 'polygon(14% 0% ,72% 0%,90% 90%,0% 100%)',
			borderRadius: '0 0 40% 10%',
		})

		gsap.from('#video-frame', {
			clipPath: 'polygon(0% 0% ,100% 0%,100% 100%,0% 100%)',
			borderRadius: '0 0 0 0 ',
			ease: 'power1.inOut',
			scrollTrigger: {
				trigger: '#video-frame',
				start: 'center center',
				end: 'bottom center',
				scrub: true,
			},
		})
	})

	return (
		<section className='relative h-dvh w-screen overflow-x-hidden'>
			{/* three dots on loading */}

			{isLoading && (
				<div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50 '>
					<div className='three-body'>
						<div className='three-body__dot'></div>
						<div className='three-body__dot'></div>
						<div className='three-body__dot'></div>
					</div>
				</div>
			)}
			<div
				id='video-frame'
				className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75 '
			>
				<div className=''>
					<div className='mask-clip-path absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
						<div
							className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'
							onClick={handelMiniVideoClick}
						>
							<video
								ref={nextVideoRef}
								src={getVideoSrc(upcomingVideoIndex)}
								loop
								muted
								id='current-video'
								className='size-64 origin-center scale-150 object-cover object-center'
								onLoadedData={handelVidoeLoad}
							/>
						</div>
					</div>
					{/* small video hover */}

					<video
						ref={nextVideoRef}
						src={getVideoSrc(currenIndex)}
						loop
						muted
						id='next-video'
						className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
						onLoadedData={handelVidoeLoad}
					/>
					{/* main video */}

					<video
						src={getVideoSrc(currenIndex === totalVideos + 1 ? 1 : currenIndex)}
						autoPlay
						loop
						muted
						className='absolute left-0 top-0 size-full object-cover object-center'
					/>
				</div>
				<h1 className='special-font hero-heading absolute  bottom-5 right-5 z-40 text-blue-75 '>
					G<b>a</b>ming
				</h1>
				<div className='absolute left-0 top-0 z-40 size-full'>
					<div className='mt-24 px-5 sm:px-10'>
						<h1 className='special-font hero-heading text-blue-100'>
							redefi<b>n</b>e
						</h1>
						<p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
							Enter the Metagame Layer <br />
							Unleash the Play Economy
						</p>
						<Button
							id='watch-trailer'
							title='Watch Trailer'
							leftIcon={<TiLocationArrow />}
							containerClass='!bg-yellow-300 flex-center gap-1'
						/>
					</div>
				</div>
			</div>
			<h1 className='special-font hero-heading absolute  bottom-5 right-5  text-black '>
				G<b>a</b>ming
			</h1>
		</section>
	)
}

export default Hero
