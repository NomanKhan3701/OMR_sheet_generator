export const useTimeout = (callback, timeout) => {
    useEffect(() => {
        const timeoutReference = setTimeout(callback, timeout);

        return () => clearTimeout(timeoutReference);
    }, [])
}