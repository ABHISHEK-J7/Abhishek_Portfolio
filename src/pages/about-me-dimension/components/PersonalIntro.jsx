import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const PersonalIntro = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex items-center justify-center py-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Personal Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="aspect-square rounded-2xl overflow-hidden cosmic-border bg-surface">
                <Image
                  src="/public/assets/images/My_Image.jpg"
                  alt="Abhishek Nallam - Full Stack Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center cosmic-glow animate-float">
                <Icon name="Code" size={32} color="white" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center particle-glow animate-particle">
                <Icon name="Sparkles" size={24} color="white" />
              </div>
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-3xl -z-10 animate-pulse-glow"></div>
            </div>
          </motion.div>

          {/* Introduction Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center space-x-3"
              >
                <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                <span className="text-secondary font-medium text-sm uppercase tracking-wider">
                  Full Stack Developer
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-5xl lg:text-6xl font-bold text-gradient-primary leading-tight"
              >
                Abhishek Nallam
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="text-xl text-text-secondary leading-relaxed"
              >
                Where technical expertise meets creative vision. I don't just build functional solutions—I craft digital experiences that captivate and inspire.
              </motion.p>
            </div>

            {/* Philosophy Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="relative p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 cosmic-border"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Quote" size={20} color="white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    My Philosophy
                  </h3>
                  <p className="text-text-secondary italic">
                    "Code that captivates, solutions that scale. I believe in creating immersive digital environments that push the boundaries of what's possible while maintaining exceptional user experience."
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { icon: 'Calendar', value: '2+', label: 'Years Experience' },
                { icon: 'Rocket', value: '5+', label: 'Projects Delivered' },
                { icon: 'Users', value: '10K+', label: 'Users Impacted' }
              ]?.map((stat, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="w-12 h-12 bg-surface rounded-lg flex items-center justify-center mx-auto cosmic-border">
                    <Icon name={stat?.icon} size={20} className="text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">{stat?.value}</div>
                  <div className="text-sm text-text-secondary">{stat?.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default PersonalIntro;