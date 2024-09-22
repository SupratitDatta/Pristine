import React, { useMemo } from 'react';
import { HashLoader, PacmanLoader, RotateLoader, SyncLoader, ClimbingBoxLoader } from 'react-spinners';

interface LoaderEntry {
    component: React.ElementType<any>;
    props: any;
}

const loaders: LoaderEntry[] = [
    { component: HashLoader, props: { color: '#9239FF', size: 50 } },
    { component: PacmanLoader, props: { color: '#9239FF', size: 30 } },
    { component: RotateLoader, props: { color: '#9239FF', size: 20 } },
    { component: SyncLoader, props: { color: '#9239FF', size: 20 } },
    { component: ClimbingBoxLoader, props: { color: '#9239FF', size: 20 } }
];

const Loader: React.FC = () => {
    const RandomLoader = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * loaders.length);
        const LoaderComponent = loaders[randomIndex].component;
        const loaderProps = loaders[randomIndex].props;
        return <LoaderComponent {...loaderProps} />;
    }, []);

    return (
        <div style={{ padding: 350 }}>
            {RandomLoader}
        </div>
    );
};

export default Loader;