import Link from 'next/link'
import navItems from '../data/navItems.json'
import NavMobile from './NavMobile'
const Nav = () => (
  <div className="flex items-center justify-between p-4 bg-white">
    <NavMobile />
    <div className="text-base md:text-xl font-bold text-blue-400">HEALTH EXPLORE</div>
    <div className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <span key={item.label} className="text-sm font-bold uppercase">
          {item.label}
        </span>
      ))}
    </div>
    <div className="flex items-center space-x-4">
      <button className="hidden md:block p-1 text-sm rounded border border-blue-400 text-blue-400 focus:outline-none hover:border-blue-600 hover:text-blue-600">CREATE JOB</button>
      <div className="w-7 h-7 relative flex items-center justify-center rounded-full bg-blue-400 text-white text-sm font-semibold">
        JO
        <span className="w-4 h-4 absolute left-4 bottom-4 rounded-full border-2 border-white bg-red-500 text-1 flex items-center justify-center">2</span>
      </div>
      <span className="hidden md:block text-sm">LOGOUT</span>
    </div>
  </div>
)

export default Nav