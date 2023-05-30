"use client";

import React, { useEffect, useState } from 'react'
import styles from './OMRSheet.module.scss';
import { getAlphabets, getNumbers } from '@/shared/utility';

const OMRSheet = ({ filters, OMRref }) => {
    const [questions, setQuestions] = useState([])
    const infoLength = {
        name: 26,
        rollNo: 10,
        subject: 20,
    };
    const [user, setUser] = useState({
        name: {
            value: [...Array(infoLength.name).keys()],
            alphabets: getAlphabets()
        },
        rollNo: {
            value: [...Array(infoLength.rollNo).keys()],
            alphabets: getNumbers()
        },
    })
    const totalQnaInOneColumn = parseInt(filters.totalQuestionInOneColumn) || 1

    useEffect(() => {
        if (filters.totalQuestion) {
            let newQuestions = [];
            for (let i = 1; i <= filters.totalQuestion; i = i + totalQnaInOneColumn) {
                const maxIdx = i + totalQnaInOneColumn - 1 > filters.totalQuestion ? parseInt(filters.totalQuestion - i) : totalQnaInOneColumn;

                newQuestions.push([...Array(totalQnaInOneColumn).keys()].map((item) => {
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
                }));
            }
            setQuestions(newQuestions)
        }

    }, [filters])

    return (
        <div className={styles.OMR_sheet} ref={OMRref} style={{ "--omr-color": `${filters.color.value}` }}>
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
            <div className={styles.user_info}>
                <div className={styles.left_container}>
                    <div className={styles.title}>Student's Name (In block letters only)</div>
                    <div className={styles.name}>
                        {
                            user.name.value.map((item, idx) => <div className={styles.box}></div>)
                        }
                    </div>
                    <div className={styles.letters_container}>
                        {
                            user.name.value.map((item, idx) => {
                                return <div className={styles.letters}>
                                    {
                                        user.name.alphabets.map((letter, index) => {
                                            return (
                                                <div className={styles.letter} key={`${letter}${index}`}>
                                                    {letter}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            })
                        }
                    </div>

                </div>
                <div className={styles.right_container}>
                    <div className={styles.roll_container}>
                        <div className={styles.title}>Roll Number</div>
                        <div className={styles.roll_num}>
                            {
                                user.rollNo.value.map((item, idx) => <div className={styles.box}></div>)
                            }
                        </div>
                        <div className={styles.letters_container}>
                            {
                                user.rollNo.value.map((item, idx) => {
                                    return <div className={styles.letters}>
                                        {
                                            user.rollNo.alphabets.map((letter, index) => {
                                                return (
                                                    <div className={styles.letter} key={`${letter}${index}`}>
                                                        {letter}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.info_container}>
                        <div className={styles.form_item}>
                            <div className={styles.label}>Subject</div>
                            <div className={styles.input}></div>
                        </div>
                        <div className={styles.form_item}>
                            <div className={styles.label}>Batch</div>
                            <div className={styles.input}></div>
                        </div>
                        <div className={styles.form_item}>
                            <div className={styles.label}>Test Date</div>
                            <div className={styles.input}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.main_container}>
                <div className={styles.border}></div>
                <div className={styles.test_container}>
                    <div className={styles.marker + " " + styles.tr}></div>
                    <div className={styles.marker + " " + styles.tl}></div>
                    <div className={styles.marker + " " + styles.bl}></div>
                    <div className={styles.marker + " " + styles.br}></div>
                    {
                        questions.map((item, qnaIdx) => {

                            return (
                                <div className={styles.section} key={qnaIdx}>
                                    {
                                        item.map((question, idx) => {
                                            const padTop = idx % filters.totalQuestionInOneSection === 0;
                                            const padBottom = (idx + 1) % filters.totalQuestionInOneSection === 0 || (idx + 1) % totalQnaInOneColumn === 0;
                                            const borderBottom = padBottom && (idx + 1) % totalQnaInOneColumn !== 0
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
                <div className={styles.border + " " + styles.right}></div>
            </div>


            <div className={styles.footer}>
                <div className={styles.signature}>
                    <div className={styles.label}>
                        {"Candidate's Signature"}
                    </div>
                    <div className={styles.input}></div>
                </div>
                <div className={styles.signature}>
                    <div className={styles.label}>
                        {"Invigilator's Signature"}
                    </div>
                    <div className={styles.input}></div>
                </div>
            </div>
        </div >
    )
}

export default OMRSheet