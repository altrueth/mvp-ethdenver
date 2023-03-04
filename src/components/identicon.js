// Sourced from https://github.com/Uniswap/interface/blob/e2f50417073855e2cb983e14950a0d6b388fec09/src/components/Identicon/index.tsx

import jazzicon from '@metamask/jazzicon'
import { useWeb3React } from '@web3-react/core'
import { useLayoutEffect, useMemo, useRef } from 'react'

export default function Identicon({ size }) {
    const { account } = useWeb3React()

    const iconSize = size ?? 24

    const icon = useMemo(() => account && jazzicon(iconSize, parseInt(account.slice(2, 10), 16)), [account, iconSize])
    const iconRef = useRef(null)
    useLayoutEffect(() => {
        const current = iconRef.current
        if (icon) {
            current?.appendChild(icon)
            return () => {
                try {
                    current?.removeChild(icon)
                } catch (e) {
                    console.error('Avatar icon not found')
                }
            }
        }
        return
    }, [icon, iconRef])

    return (
        <span ref={iconRef} />
    )
}
