
type TargetContext = '_self' | '_parent' | '_blank' | '_top';

export const openWindow = (
    url: string,
    opts?: { target?: TargetContext; [key: string]: any }
) => {
    const { target = '_blank', ...others } = opts || {};
    window.open(
        url,
        target,
        Object.entries(others)
            .reduce((preValue: string[], curValue) => {
                const [key, value] = curValue;
                return [...preValue, `${key}=${value}`];
            }, [])
            .join(',')
    );
};

