import React from 'react';
import Image from 'next/image';

export function LogoCollapsed(props: React.ComponentPropsWithoutRef<'img'>) {
    return (
        <Image src="/favicon.svg" width={30} height={40} alt="Logo" {...props} />
    );
}

// Test

// import React from 'react';
// import Image from 'next/image';

// type LogoCollapsedProps = React.ComponentPropsWithoutRef<'img'> & {
//   width?: number | `${number}`;
//   height?: number | `${number}`;
// };

// export function LogoCollapsed({ width = 30, height = 40, ...props }: LogoCollapsedProps) {
//     return (
//         <Image src="/favicon.svg" width={width} height={height} alt="Logo" {...props} />
//     );
// }

