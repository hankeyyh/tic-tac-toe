'use client'

import { useState } from "react";

export default function Game() {
    const [history, setHistory] = useState<number[]>(Array(9).fill(null))
    const [currentMove, setCurrentMove] = useState<number>(0)

    return (
        <></>
    );
}