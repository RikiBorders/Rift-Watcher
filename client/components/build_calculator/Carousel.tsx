import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import styles from "./Carousel.module.css";

export default function Carousel(props: any) {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent(current === props.itemLists.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? props.itemLists.length - 1 : current - 1);
  };

  const jump_to_index = (index: number) => {
    setCurrent(index)
  }

  return (
    <div className={styles.slider}>
      <div className={styles.vertical_spacer} />
      <h1 className={styles.carousel_header}>Item List</h1>
      <div className={styles.button_div}>
        <motion.img whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles.page_button} onClick={prevSlide} src='/arrow_left.png'/>
        <motion.img whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles.radio_button} onClick={() => {jump_to_index(0)}} src='/radio_button.png'/>
        <motion.img whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles.radio_button} onClick={() => {jump_to_index(1)}} src='/radio_button.png'/>
        <motion.img whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles.radio_button} onClick={() => {jump_to_index(2)}} src='/radio_button.png'/>
        <motion.img whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className={styles.page_button} onClick={nextSlide} src='/arrow_right.png'/>
      </div>
      <div className={styles.vertical_spacer_small} />
      <div className={styles.content_div}>
        {props.itemLists.map((list: any, index: number) => {
          return (
            <div key={index}>
              {index === current && (
                list
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
