    import Footer_image from "../assets/Footer_image.jpg";  
    function Footer() {
  return (
    <>
      {/* 1. Changed 'class' to 'className' for React.
        2. Added 'max-w-7xl mx-auto px-4' to create a standard container. This creates a small gap from the left/right screen edges.
        3. Reduced overall padding (py-8) to make the footer much smaller. 
      */}
      <footer className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        {/* Main responsive wrapper: Stacks on mobile, sits side-by-side on desktop (lg:flex-row).
          lg:gap-12 ensures clean separation between the image block and the links. 
        */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-12">
          
          {/* LEFT SIDE: Image & Branding 
            Reduced image height (h-40 / sm:h-48) to match the "small footer" request. 
          */}
          <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
            <img
              alt="Company Branding"
              src={Footer_image}
              className="h-40 w-full rounded-se-3xl rounded-es-3xl object-cover sm:h-48"
            />

            <div className="mt-4 flex items-center justify-center lg:justify-start gap-4">
              
              
             
            </div>
          </div>

          {/* RIGHT SIDE: Contact Info & Quick Links 
            Uses flex-1 to take up the rest of the space, divided into 3 responsive columns. 
          */}
          <div className="flex-1 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Column 1: Call Us & Socials */}
            <div>
              <p>
                <span className="text-xs tracking-wide font-bold  text-gray-500 uppercase" > Contact us </span>
                {/* Reduced text size slightly for the smaller footprint */}
                <a href="#" className="block text-xl font-medium text-gray-900 hover:opacity-75 sm:text-2xl">
                  +91-9694132733<br></br>
                  +91-9829133136
                </a>
              </p>

              {/* Reduced mt-8 to mt-4 */}
              <ul className="mt-4 space-y-1 text-sm text-gray-700">
                <li>Monday to Friday: 8:00am - 5:00pm</li>
                <li>Weekend: 8:00am - 2:00pm</li>
              </ul>

              {/* Social Icons: Replaced with WhatsApp & YouTube, removed the rest */}
              <ul className="mt-6 flex gap-6">
                <li>
                  <a href="#" rel="noreferrer" target="_blank" className="text-black-700 transition hover:text-green-600">
                    <span className="sr-only">WhatsApp</span>
                    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.488-1.761-1.663-2.06-.175-.298-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
                    </svg>
                  </a>
                </li>

                <li>
                  <a href="https://www.youtube.com/@diamondkidsschool2951" rel="noreferrer" target="_blank" className="text-black-700 transition hover:text-red-600">
                    <span className="sr-only">YouTube</span>
                    <svg className="size-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Quick Links (Services) */}
            <div>
              <p className="font-medium text-gray-900">Quick Links</p>
              {/* Used space-y-3 instead of space-y-4 to keep the list tighter */}
              <ul className="mt-4 space-y-3 text-sm">
  
              </ul>
            </div>

            {/* Column 3: Quick Links (Company) */}
            <div>
              <p className="font-medium text-gray-900">Know More</p>
              <ul className="mt-4 space-y-3 text-sm">
                <li><a href="#" className="text-gray-700 transition hover:opacity-75">About</a></li>
                <li><a href="#" className="text-gray-700 transition hover:opacity-75">Meet the Team</a></li>
                <li><a href="#" className="text-gray-700 transition hover:opacity-75">Accounts Review</a></li>
              </ul>
            </div>
            
          </div>
        </div>

        {/* BOTTOM ROW: T&C, Privacy Policy 
          Reduced mt-12 and pt-12 down to mt-8 and pt-8 to limit wasted whitespace.
        */}
        <div className="mt-8 border-t border-gray-100 pt-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-4 text-xs">
              <li><a href="#" className="text-gray-500 transition hover:opacity-75">Terms &amp; Conditions</a></li>
              <li><a href="#" className="text-gray-500 transition hover:opacity-75">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-500 transition hover:opacity-75">Cookies</a></li>
            </ul>

            <p className="mt-4 text-xs text-gray-500 sm:mt-0">
              &copy; 2026. Diamond Kids School . All rights reserved.
            </p>
          </div>
        </div>
        
      </footer>
    </>
  );
}

export default Footer;
