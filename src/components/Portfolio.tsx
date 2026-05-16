'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    title: 'Project One',
    category: 'Solar Energy',
    image: 'https://images.unsplash.com/photo-1509391366360-fe5bb584850a?auto=format&fit=crop&q=80&w=2000',
    color: '#3b82f6',
    gridSpan: 'md:col-span-8 md:row-span-2 h-[600px] md:h-auto',
    link: 'https://sun-solar-three.vercel.app/'
  },
  {
    title: 'Project Two',
    category: 'E-commerce',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=2000',
    color: '#a855f7',
    gridSpan: 'md:col-span-4 md:row-span-1 h-[300px]',
    link: '#'
  },
  {
    title: 'Project Three',
    category: 'Fintech',
    image: 'https://images.unsplash.com/photo-1551288049-bb1c00ad882c?auto=format&fit=crop&q=80&w=2000',
    color: '#22d3ee',
    gridSpan: 'md:col-span-4 md:row-span-1 h-[300px]',
    link: '#'
  },
  {
    title: 'Project Four',
    category: 'Architecture',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000',
    color: '#ffffff',
    gridSpan: 'md:col-span-12 md:row-span-1 h-[400px]',
    link: '#'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export default function Portfolio() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-accent-blue font-display font-bold uppercase tracking-widest text-sm mb-4"
            >
              Selected Projects
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-bold tracking-tighter uppercase"
            >
              Our <span className="text-white/20">Work</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <button className="px-8 py-4 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-500 font-bold uppercase tracking-widest text-xs">
              View All Projects
            </button>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.link}
              target={project.link !== '#' ? "_blank" : undefined}
              rel={project.link !== '#' ? "noopener noreferrer" : undefined}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-[2.5rem] bg-white/5 border border-white/10 ${project.gridSpan} block`}
            >
              <div className="absolute inset-0 z-10 transition-transform duration-700 group-hover:scale-105">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-40 group-hover:opacity-100"
                />
              </div>
              
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              
              <div className="absolute inset-0 z-30 p-10 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-4 font-bold">
                    {project.category}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-4">
                    {project.title}
                    <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                </div>
              </div>

              {/* Accent Glow */}
              <div 
                className="absolute top-0 right-0 w-full h-full pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ 
                  background: `radial-gradient(circle at top right, ${project.color}22, transparent 70%)` 
                }}
              />
            </motion.a>
          ))}
          
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 md:row-span-1 h-[300px] rounded-[2.5rem] border border-dashed border-white/20 flex items-center justify-center p-12 text-center group hover:border-white/40 transition-colors"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter text-white/40 group-hover:text-white transition-colors">Your Project Next?</h3>
              <button className="text-xs font-bold uppercase tracking-widest text-accent-blue hover:text-white transition-colors">
                Let's Talk
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
