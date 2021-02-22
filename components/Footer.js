import Link from 'next/link'

const Footer = () => (
  <div className="p-4 grid grid-cols-4 gap-3 bg-white">
    <div className="col-span-2 flex flex-col">
      <span className="font-bold text-md mb-2">About us</span>
      <span>We are a team of nurses, doctors, technologies and executives dedicated to help nurses
        find jobs that they love.
        All copyrights reserved @2020 - Health Explore
      </span>
    </div>
    <div className="flex flex-col">
      <span className="font-bold text-md mb-2">Sitemap</span>
      <span>Nurses</span>
      <span>Employers</span>
      <span>Social networking</span>
      <span>Jobs</span>
    </div>
    <div className="flex flex-col">
      <span className="font-bold text-md mb-2">Privacy</span>
      <span>Terms of use</span>
      <span>Privacy policy</span>
      <span>Cookie policy</span>
    </div>
  </div>
)

export default Footer