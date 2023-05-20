import React from "react";
import classes from "./LimitChar.module.scss"

const LimitChar = ({ word, limit, hoverhide, className, styles, fitContent, withCSS }) => {
	return (
		/* Send hover false or value except true to disable the hover functionality */

		withCSS ?
			(
				<div className={classes.overflow_ellipsis + ` ${className ? className : ""}`} styles={{ ...styles }}>{word}</div >
			)
			: (
				<div className={classes.limit_char_container + ` ${className ? className : ` ${fitContent ? classes.noMax : ""}`}` + ` ${hoverhide ? "" : word?.length > limit ? classes.limit_char_hover : ""}`} styles={{ ...styles }}>
					{word && word?.length > limit
						? word.substring(0, limit).replaceAll("_", " ") + "..."
						: word?.replaceAll("_", " ")}
					<div className={classes.full_word_show}>{word}</div>
				</div>
			)
	);
};

export default LimitChar;
