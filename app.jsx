function Navbar() {
    return (
        <nav>
            <span>Mr     SA🇿🇦</span>
            <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    )
}

function Hero() {
    const [text, setText] = React.useState('')
    const fullText = "Hi, I'm Alpha Mkhize."

    React.useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            setText(fullText.slice(0, i + 1))
            i++
            if (i === fullText.length) clearInterval(interval)
        }, 80)
        return () => clearInterval(interval)
    }, [])

    return (
        <section id="hero">
            <h1>{text}<span className="cursor">|</span></h1>
            <p>I Write Code for Living</p>
            <a href="#projects" link rel="projects.jsx">Read About My Work</a>
        </section>
    )
}

function App() {
    const [page, setPage] = React.useState('home')

    return (
        <div>
            <Navbar />
            {page === 'home' && <Hero setPage={setPage} />}
            {page === 'projects' && <Projects />}
        </div>
    )
}

function Projects() {
    return (
        <section id="projects">
            <h2>My Projects</h2>
            <p>Coming soon...</p>
        </section>
    )
}


ReactDOM.createRoot(document.getElementById('root')).render(<App />)