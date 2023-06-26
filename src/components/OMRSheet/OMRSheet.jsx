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
        section: 1,
        class: 2,
        subject: 15,
        subjectCode: 5,
        date: 10,
        testId: 10,
        lastPage: 9,
    };
    const [user, setUser] = useState({
        name: {
            value: [...Array(infoLength.name).keys()],
            characters: getAlphabets(),
            title: "Student's Name (In block letters only)"
        },
        rollNo: {
            value: [...Array(infoLength.rollNo).keys()],
            characters: getNumbers(),
            title: "Roll Number"
        },
        section: {
            value: [...Array(infoLength.section).keys()],
            characters: getAlphabets(10),
            title: "Section"
        },
        class: {
            value: [...Array(infoLength.class).keys()],
            characters: getNumbers(),
            title: "Class"
        },
        subject: {
            value: [...Array(infoLength.subject).keys()],
            characters: getAlphabets(),
            title: "Subject"
        },
        date: {
            value: [...Array(infoLength.date).keys()],
            characters: getNumbers(),
            title: "Date"
        },
        testId: {
            value: [...Array(infoLength.testId).keys()],
            characters: getNumbers(),
            title: "Test ID"
        },
        lastPage: {
            value: [...Array(infoLength.lastPage).keys()],
            characters: getAlphabets(),
            title: "Last Page (Do not write anything here)"
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


    const InputSection = ({ field, values = [] }) => {
        return <div className={styles.section_container}>
            <div className={styles.title}>{field.title}</div>
            <div className={styles.value}>
                {
                    field.value.map((item, idx) => <div className={styles.box} key={idx}></div>)
                }
            </div>
            <div className={styles.letters_container}>
                {
                    field.value?.map((item, idx) => {
                        return <div className={styles.letters} key={idx}>
                            {
                                field.characters.map((char, index) => {
                                    return (
                                        <div className={styles.letter + ` ${values[idx] == char ? styles.active : ""}`} key={`${char}${index}`}>
                                            {char}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    })
                }
            </div>
        </div>
    }

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
            <div className={styles.scanner_container}>
                <div className={styles.border}></div>
                <div className={styles.marker + " " + styles.tr}></div>
                <div className={styles.marker + " " + styles.tl}></div>
                <div className={styles.marker + " " + styles.bl}></div>
                <div className={styles.marker + " " + styles.br}></div>
                <div className={styles.middle_container}>
                    {
                        filters.type?.toLowerCase() === "omr" ? <>
                            <div className={styles.user_info}>
                                <div className={styles.group_container}>
                                    <div className={styles.form_item}>
                                        <div className={styles.label}>Student&apos;s Name:</div>
                                        <div className={styles.input}></div>
                                    </div>
                                    <div className={styles.form_item}>
                                        <div className={styles.label}>Subject:</div>
                                        <div className={styles.input}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.user_info}>
                                <div className={styles.form_item}>
                                    <div className={styles.label}>Class:</div>
                                    <div className={styles.input}></div>
                                </div>
                                <div className={styles.form_item}>
                                    <div className={styles.label}>Section:</div>
                                    <div className={styles.input}></div>
                                </div>
                                <div className={styles.form_item}>
                                    <div className={styles.label}>Date (DD/MM/YYYY):</div>
                                    <div className={styles.value}>
                                        <div className={styles.box}></div>
                                        <div className={styles.box}></div>
                                        <div className={styles.box}></div>
                                        <div className={styles.box}></div>
                                        <div className={styles.box}></div>
                                        <div className={styles.box}></div>
                                        <div className={styles.box}></div>
                                        <div className={styles.box}></div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.user_info}>
                                <div className={styles.group_container}>
                                    <InputSection field={user.testId} />
                                    <InputSection field={user.rollNo} />

                                    <div className={styles.info_container}>
                                        <div className={styles.instructions_container}>
                                            <div className={styles.title}>Instructions</div>
                                            <ol className={styles.instructions}>
                                                <li>Use only blue or black ball point pen to fill the circles.</li>
                                                <li>Circles should be dark and completely filled.</li>
                                                <li>Cutting or erasing on the sheet is not allowed.</li>
                                                <li>Do not use any stray marks on the sheet.</li>
                                            </ol>
                                        </div>
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
                        </> : <>
                            <div className={styles.no_scan_container}>
                                <InputSection field={user.lastPage} values={"DONOTSCAN".split("")} />
                            </div>

                            <div className={styles.test_container}></div>
                        </>
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