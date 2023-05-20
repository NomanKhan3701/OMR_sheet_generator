import { useState, useEffect } from "react";

export default function useElementOnScreen(ref, offset = 0, offsetTop = null, offsetBottom = null) {
	const [elemScrollPos, setElemScrollPos] = useState({
		below: false,
		above: false,
		visible: false,
	});

	useEffect(() => {
		const observer = new window.IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setElemScrollPos({
					below: false,
					above: false,
					visible: true,
					scrollTop: entry.boundingClientRect.top,
					scrollBottom: entry.boundingClientRect.bottom,
				});
				return
			}
			if (entry.boundingClientRect.top > 0) {
				setElemScrollPos({
					below: true,
					above: false,
					visible: false,
					scrollTop: entry.boundingClientRect.top,
					scrollBottom: entry.boundingClientRect.bottom,
				});
			} else {
				setElemScrollPos({
					below: false,
					above: true,
					visible: false,
					scrollTop: entry.boundingClientRect.top,
					scrollBottom: entry.boundingClientRect.bottom,
				});
			}
		}, {
			rootMargin: `${offsetTop || offset || offsetBottom}px 0px ${offsetBottom || offset || offsetTop}px 0px`,
		})
		if (ref.current) {
			observer.observe(ref.current);
		}
		return () => {
			if (ref.current) {
				observer.unobserve(ref.current);
			}
		};
	}, []);
	return elemScrollPos;
}