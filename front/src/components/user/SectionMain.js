import React, {useState} from 'react'
import { Image } from 'react-bootstrap';
import mainImg from '../imgs/main.png';
import './Style.css';

const SectionMain = () => {
   
    return (
        <>
            <div className="sectionMain">
                <Image className="MainImg" src={mainImg}/>
                <div className="textBox">
                    <p className="title1">포트폴리오를 공유하세요.</p>
                    <p className="title2">다양한 개발자 포트폴리오를 공유하는 서비스를 제공합니다.</p>
                </div>
            </div>
        </>
    )
}

export default SectionMain;