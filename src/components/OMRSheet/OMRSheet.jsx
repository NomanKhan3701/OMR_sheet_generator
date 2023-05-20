"use client";

import React, { useEffect, useState } from 'react'
import styles from './OMRSheet.module.scss';

const OMRSheet = ({ filters }) => {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        if (filters.totalQuestion) {
            setQuestions([])
            for (let i = 1; i <= filters.totalQuestion; i = i + filters.totalQuestionInOneColumn) {
                const maxIdx = i + filters.totalQuestionInOneColumn - 1 > filters.totalQuestion ? filters.totalQuestion - i : filters.totalQuestionInOneColumn;

                setQuestions((prev) => [...prev, [...Array(filters.totalQuestionInOneColumn).keys()].map((item) => {
                    if (item > maxIdx) {
                        return {
                            questionNo: null,
                            options: [],
                            correctAnswer: null,
                            optionMarked: null
                        }
                    }
                    return {
                        questionNo: item + i,
                        options: ['A', 'B', 'C', 'D'],
                        correctAnswer: 'A',
                        optionMarked: null
                    }
                })])
            }
        }
    }, [filters])

    return (
        <div className={styles.OMR_sheet}>
            <div className={styles.header}>
                <div className={styles.header_item}>
                    <div className={styles.strong_txt}>
                        Logo
                    </div>
                </div>
                <div className={styles.header_item}>
                    <div className={styles.strong_txt}>
                        Omr sheet
                    </div>
                </div>
                <div className={styles.header_item}>
                    <div className={styles.strong_txt}>
                        Barcode
                    </div>
                </div>
            </div>
            <div className={styles.test_container}>
                {
                    questions.map((item, qnaIdx) => {

                        return (
                            <div className={styles.section} key={qnaIdx}>
                                {
                                    item.map((question, idx) => {
                                        const padTop = idx % filters.totalQuestionInOneSection === 0;
                                        const padBottom = (idx + 1) % filters.totalQuestionInOneSection === 0 || (idx + 1) % filters.totalQuestionInOneColumn === 0;
                                        const borderBottom = padBottom && (idx + 1) % filters.totalQuestionInOneColumn !== 0
                                        const extraStyle = padTop ? styles.pad_top : padBottom ? styles.pad_bottom : "";

                                        return (
                                            <div key={idx} className={styles.question + ` ${borderBottom ? styles.border_bottom : ""}`}>
                                                <div className={styles.question_no + " " + extraStyle}>{question.questionNo}</div>
                                                <div className={styles.options + " " + extraStyle}>
                                                    {
                                                        question.options.map((option, index) => {
                                                            return (
                                                                <div className={styles.option} key={index}>
                                                                    <div className={styles.option_no}>{option}</div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles.footer}>
                <div className={styles.signature}>
                    <div className={styles.label}>
                        Candidate's Signature
                    </div>
                    <div className={styles.input}></div>
                </div>
                <div className={styles.signature}>
                    <div className={styles.label}>
                        Invigilator's Signature
                    </div>
                    <div className={styles.input}></div>
                </div>
            </div>
        </div>
    )
}

export default OMRSheet