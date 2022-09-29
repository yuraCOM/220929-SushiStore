import React from 'react'
import './footer.css'
import logo from '../img/logo.png'


const Footer = () => {
    return (

        <div className='footer flex'>
            <div className='footer_top flex'>

                <div className="soc flex-left">
                    <div className="soc-link soc-link-tg ">
                        <a href="/" alt="tg"> </a>
                    </div>
                    <div className="soc-link soc-link-insta " >
                        <a href="/"> </a>
                    </div>
                </div>


                <div>
                    <div className="footer_block_contact_text">
                        <p>м.Днепро, ул.Василия Липкивського 99Б </p>
                        <p>м.Киев, ул. Федора Эрнста 77А</p>
                    </div>
                </div>
                <div>
                    <div className="footer_block_contact_text">
                        <p>Tel: 063-111-11-11</p>
                        <p>Time: Пн-Вс, 10:00-20:00</p>
                    </div>
                </div>
                <div className="footer_logo" id="">
                    <div className="logo">
                        <a href="/"><img src={logo} alt='logo' /></a>

                    </div>
                </div>
            </div >

            <div className="footer_bottom">
                <p>SushiStore YurOk 2022</p>

            </div>
        </div>


    )
}

export default Footer