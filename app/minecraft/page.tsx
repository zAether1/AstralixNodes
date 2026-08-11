'use client';
import React, { useEffect } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";
import Price from '../components/Price';
import Link from "next/link";
import ComingSoonBlock from '../components/ComingSoonBlock';

export default function MinecraftPage() {

  return (
    <div className="min-h-screen bg-[#020202]">
      <Navbar />
      <ComingSoonBlock
              title="Minecraft"
              description="Estamos preparando contenidos especiales para Minecraft. Únete a Discord para recibir noticias primero."
              ctaText="Unirme a Discord"
              bgImage="/assets/games/minecraft-7.jpeg"
            />
      <Footer />
    </div>
  );
}
