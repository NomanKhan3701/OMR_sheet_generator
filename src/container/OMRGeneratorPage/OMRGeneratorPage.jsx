"use client";

import React, { useRef, useState } from 'react'
import styles from './OMRGeneratorPage.module.scss';
import Filter from '@/components/Filter/Filter';
import OMRSheet from '@/components/OMRSheet/OMRSheet';

const OMRGeneratorPage = () => {
    const [filters, setFilters] = useState({
        // type: "LAST_PAGE",
        type: "OMR",
        totalQuestion: 30,
        totalQuestionInOneColumn: 8,
        totalQuestionInOneSection: 4,
        color: {
            name: "pink",
            value: "#dd66b3"
        }
    })
    const OMRref = useRef(null);

    return (
        <div className={styles.OMR_generator_page}>
            <Filter filters={filters} setFilters={setFilters} OMRref={OMRref} />
            <OMRSheet filters={filters} OMRref={OMRref} />
        </div>
    )
}

export default OMRGeneratorPage