import constants from './../constant';

const Footer = ()=>{
    return(
        <footer className='bg-white-400 flex justify-center items-center min-h-30'>
            <div className='flex flex-col overflow-x-hidden sm:flex-row sm:gap-60'>
                <div className='flex flex-col gap-2 text-center px-2 py-2'>
                    <h3 className='font-bold'>{constants.general.contact_us}</h3>
                    <p className="text-gray-600 font-semibold">{constants.footerConstants.address}</p>
                    <ul className='flex flex-col gap-2'>
                        <li>
                            <div className='items-center justify-center'>
                                <p>{constants.footerConstants.email}</p>
                            </div>
                        </li>
                        <li>
                            <div className='items-center justify-center'>
                                <p>{constants.footerConstants.phone}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='flex flex-col items-center gap-2 px-2 py-2'>
                    <h3 className='font-bold'>{constants.general.find_us}</h3>
                    <a href={ constants.footerConstants.mapLink }>{constants.footerConstants.maps}</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;