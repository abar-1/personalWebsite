"use client";

import React from 'react';
import { useState } from 'react';
import { Anton, Josefin_Sans, Libre_Franklin} from 'next/font/google';
import './header.css';

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
});

const monsterrat = Josefin_Sans({
    weight: '400',
    subsets: ['latin'],
});

export default function Header() {
    return (
        <header>
            <div className="header-container">
                <h1 className={anton.className}>AB</h1>
                <div className={`${monsterrat.className} nav-links`}>
                    <a href="#about">About</a>
                    <a href="#tools">Tools</a>
                    <a href="#experience">Experience</a>
                    <a href="#projects">Projects</a>
                </div>
                <div className="socials">
                    <a href="https://www.linkedin.com/in/aneesh-bargaje-a345b7269/" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/?size=100&id=13930&format=png&color=000000" alt="linkedin" />
                    </a>
                    <a href="https://github.com/abar-1" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/?size=100&id=3tC9EQumUAuq&format=png&color=FFFFFF" alt="github" />
                    </a>
                    <a href="https://www.instagram.com/b._aneesh/?next=%2F" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/?size=100&id=32323&format=png&color=000000" alt="instagram" />
                    </a>
                </div>
            </div>
        </header>
    );
}
