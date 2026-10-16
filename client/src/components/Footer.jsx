import React from 'react'
import assets from '../assets/assets'

export const Footer = () => {
  return (
    <footer className=" bg-[#F6F9EC] px-6 md:px-16 lg:px-24 xl:px-32">
    <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
        <div>
            <img className="w-34 md:w-32 bg-black" src={assets.logo} alt="Logo" />
            <p className="max-w-[410px] mt-6">Discover the world's most luxurious hotels with QuickStay. Experience unparalleled comfort, exclusive amenities, luxury villas and private islands.</p>
        <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
            <div>
                <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">Quick Links</h3>
                <ul className="text-sm space-y-1">
                    <li><a href="#" className="hover:underline transition">Home</a></li>
                    <li><a href="#" className="hover:underline transition">Best Sellers</a></li>
                    <li><a href="#" className="hover:underline transition">Offers & Deals</a></li>
                    <li><a href="#" className="hover:underline transition">Contact Us</a></li>
                    <li><a href="#" className="hover:underline transition">FAQs</a></li>
                </ul>
            </div>
            <div>
                <h3 className="flex items-center font-semibold text-base text-gray-900 md:mb-5 mb-2">Need Help?</h3>
                <ul className="text-sm space-y-1">
                    <li><a href="#" className="hover:underline transition">Delivery Information</a></li>
                    <li><a href="#" className="hover:underline transition">Return & Refund Policy</a></li>
                    <li><a href="#" className="hover:underline transition">Payment Methods</a></li>
                    <li><a href="#" className="hover:underline transition">Track your Order</a></li>
                    <li><a href="#" className="hover:underline transition">Contact Us</a></li>
                </ul>
            </div>
            <div>
                <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">Follow Us</h3>
                <ul className="text-sm space-y-1">
                    <li><a href="#" className="hover:underline transition">Instagram</a><img src={assets.instagramIcon} alt="Instagram" className="w-4 h-4 ml-2" /></li>
                    <li><a href="#" className="hover:underline transition">Twitter</a><img src={assets.twitterIcon} alt="Twitter" className="w-4 h-4 ml-2" /></li>
                    <li><a href="#" className="hover:underline transition">Facebook</a><img src={assets.facebookIcon} alt="Facebook" className="w-4 h-4 ml-2" /></li>
                    <li><a href="#" className="hover:underline transition">YouTube</a><img src={assets.youtubeIcon} alt="YouTube" className="w-4 h-4 ml-2" /></li>
                </ul>
            </div>
        </div>
      </div>
    </div>
    <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
        Copyright 2025 © PrebuiltUI All Right Reserved.
      </p>
</footer>
  )
}
export default Footer