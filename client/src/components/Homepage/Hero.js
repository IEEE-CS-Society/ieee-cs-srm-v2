import React, {memo} from "react";
import { motion } from 'framer-motion';

const Front = () => {
    const headingVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2, ease: 'easeInOut' } },
    };

    const paragraphVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 1, delay: 0.6 } },
    };

    const buttonVariants = {
        hover: { scale: 1.05, transition: { duration: 0.3, ease: 'easeInOut' } },
    };

    return (
        <div className='lg:bg-[url("./assets/Frame.png")] bg-[url("./assets/Frame-sm.png")] xl:bg-[url("./assets/Frame.png")] bg-cover bg-center h-screen w-full flex flex-col items-center justify-center p-5'>
            <div className='w-full sm:w-[80%] md:w-[60%] lg:w-[40%] xl:w-[30%] font-agrandir text-white flex flex-col text-start justify-center'>
                <motion.h1
                    className='text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none'
                    initial="hidden"
                    animate="visible"
                    variants={headingVariants}
                >
                    Empowering
                </motion.h1>
                <motion.h1
                    className="gradient-text text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none"
                    initial="hidden"
                    animate="visible"
                    variants={headingVariants}
                >
                    Students
                </motion.h1>
                <motion.h1
                    className='text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none'
                    initial="hidden"
                    animate="visible"
                    variants={headingVariants}
                >
                    to lead
                </motion.h1>
                <motion.h1
                    className='text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none'
                    initial="hidden"
                    animate="visible"
                    variants={headingVariants}
                >
                    Technology
                </motion.h1>
                <motion.p
                    className='text-[#A09F9F] text-[16px] mt-4'
                    initial="hidden"
                    animate="visible"
                    variants={paragraphVariants}
                >
                    Empowering students with cutting-edge knowledge, leadership skills, and innovative opportunities to shape the future of technology-driven industries.
                </motion.p>
                <motion.div className='flex mt-8 gap-4'>
                    <input
                        type="email"
                        placeholder='Email'
                        className='w-full rounded-full py-2 md:py-3 text-sm md:text-base px-4 font-agrandir bg-[#110F0F] border border-white outline-none focus:border-[#EB9062] focus:ring-1 focus:ring-[#EB9062]'
                    />
                    <motion.button
                        className='font-agrandir text-sm md:text-base px-6 py-2 md:px-8 md:py-3 rounded-full bg-[#EB9062] font-medium'
                        whileHover="hover"
                        variants={buttonVariants}
                    >
                        Send
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}

export default memo(Front);
