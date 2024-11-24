import React from 'react'
import Hero from './components/Hero'

const App = () => {
	return (
		<main className='relative min-h-screen w-screen overflow-x-hidden'>
			<Hero />
			<div className='h-screen bg-blue-500'></div>
		</main>
	)
}

export default App
