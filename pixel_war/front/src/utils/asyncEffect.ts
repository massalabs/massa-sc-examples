import React from 'react';

export default function useAsyncEffect(
    fn: () => Promise<void | (() => void)>,
    dependencies?: React.DependencyList,
) {
    return React.useEffect(() => {
        const destructorPromise = fn();
        return () => {
            destructorPromise.then((destructor) => destructor && destructor());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);
}
