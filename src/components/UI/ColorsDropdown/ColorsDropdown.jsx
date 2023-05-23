import React from 'react'
import styles from './ColorsDropdown.module.scss'
import useClickOutside from '@/hooks/useClickedOutside'

const ColorsDropdown = ({ value, setValue }) => {
    const colors = [
        {
            name: "black",
            value: "black"
        }, {
            name: "pink",
            value: "#dd66b3"
        }
    ]
    const [show, setShow] = React.useState(false)
    const dropdownRef = React.useRef(null);
    const outside = useClickOutside(dropdownRef, () => setShow(false))

    const Options = () => {
        return (
            <div>
                {
                    colors?.map((item) => {
                        return (
                            <div key={item.id} className={styles.option + ` ${value?.name === item.name ? styles.active : ""}`} onClick={() => setValue(item)}>
                                {item.name}
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    return (
        <div className={styles.Colors_dropdown}>
            <div className={styles.Dropdown}>
                <div className={styles.dropdown_select} onClick={() => setShow((state) => !state)} ref={dropdownRef}>
                    <div>{value?.name}</div>
                </div>
                <div className={styles.options + ` ${show ? styles.show : ""}` + " hide-scrollbar"} onClick={() => setShow(false)}>
                    <Options />
                </div>
            </div>
        </div>
    )
}

export default ColorsDropdown