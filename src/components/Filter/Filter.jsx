"use client";

import React from 'react'
import styles from './Filter.module.scss';

const Filter = ({ filters, setFilters }) => {

    return (
        <div className={styles.Filter}>
            <div className={styles.form}>
                <div className={styles.form_item}>
                    <div>Total Questions</div>
                    <input type="number" value={filters.totalQuestion} onChange={(e) => setFilters((prev) => {
                        return {
                            ...prev,
                            totalQuestion: e.target.value > 1000 ? 1000 : e.target.value
                        }
                    })} />
                </div>
                <div className={styles.form_item}>
                    <div>Total Question in one column</div>
                    <input type="number" value={filters.totalQuestionInOneColumn} onChange={(e) => setFilters((prev) => {
                        return {
                            ...prev,
                            totalQuestionInOneColumn: e.target.value > 200 ? 200 : e.target.value
                        }
                    })} />
                </div>
                <div className={styles.form_item}>
                    <div>Total Question in one section</div>
                    <input type="number" value={filters.totalQuestionInOneSection} onChange={(e) => setFilters((prev) => {
                        return {
                            ...prev,
                            totalQuestionInOneSection: e.target.value > 200 ? 200 : e.target.value
                        }
                    })} />
                </div>

            </div>
        </div>
    )
}

export default Filter