import React, { useRef, useState } from 'react'

const Hero = () => {
	const [currenIndex, setCurrenIndex] = useState(1)
	const [hasClicked, setHasClicked] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [loadedVideos, setLoadedVideos] = useState(0)

	const totalVideos = 3
	const nextVideoRef = useRef(null)
	const upcomingVideoIndex = (currenIndex % totalVideos) + 1

	const handelMiniVideoClick = () => {
		setHasClicked(true)
		setCurrenIndex(upcomingVideoIndex)
	}

	const handelVidoeLoad = () => {
		setLoadedVideos((prev) => prev + 1)
	}

	const getVideoSrc = (index) => `videos/hero-${index}.mp4`

	return (
		<section className='relative h-dvh w-screen overflow-x-hidden'>
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
					<video
						ref={nextVideoRef}
						src={getVideoSrc(currenIndex)}
						loop
						muted
						id='next-video'
						className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
						onLoadedData={handelVidoeLoad}
					/>
					<video
						src={getVideoSrc(currenIndex === totalVideos + 1 ? 1 : currenIndex)}
						autoPlay
						loop
						muted
						className='absolute left-0 top-0 size-full object-cover object-center'
					/>
				</div>
			</div>
		</section>
	)
}

export default Hero
