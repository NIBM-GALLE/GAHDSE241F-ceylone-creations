// src/components/FAQs/FAQs.jsx
import React from 'react';
import './FAQs.css';
import { motion } from 'framer-motion';

const faqsData = [
    { question: 'What is Ceylon Creations?', answer: 'Ceylon Creations is a fair trade platform that connects Sri Lankan artisans with global buyers.' },
    { question: 'How can I buy handicrafts?', answer: 'You can browse our catalog, add items to your cart, and securely checkout through our payment gateway.' },
    { question: 'Can I book a workshop?', answer: 'Yes! We offer artisan-led workshops that you can book through our platform.' },
    { question: 'How do artisans join the platform?', answer: 'Artisans can register on our platform, list their products, and receive payments securely.' },
    { question: 'Is international shipping available?', answer: 'Yes, we support international shipping for most products.' },
    { question: 'What payment methods do you accept?', answer: 'We accept credit/debit cards, PayPal, and other secure payment methods.' },
    { question: 'How can I contact customer support?', answer: 'You can reach our support team via email or our contact page for assistance.' },
    { question: 'Do you offer gift cards?', answer: 'Yes, we offer gift cards that can be redeemed for any product or workshop on our platform.' }
];

const FAQs = () => {
    return (
        <motion.div className='faqs-container' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <motion.h2 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>Frequently Asked Questions</motion.h2>
            <div className='faqs-list'>
                {faqsData.map((faq, index) => (
                    <motion.div 
                        key={index} 
                        className='faq-item'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        <h3>{faq.question}</h3>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>{faq.answer}</motion.p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default FAQs;
