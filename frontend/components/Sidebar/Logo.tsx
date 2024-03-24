import React from 'react';
import Image from 'next/image';

export function Logo(props: React.ComponentPropsWithoutRef<'img'>) {
    return (
        <Image src="/logo.svg" width={100} height={40} alt="Logo" {...props} />
    );
}
