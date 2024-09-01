'use client'
import React, { useState, useRef } from 'react'
import { DndContext, Modifier } from '@dnd-kit/core'

import Droppable from './drop'
import Draggable from './drag'

type MyParamsType<T extends Modifier> = T extends (arg: infer K) => any
    ? K
    : never

const gridSize = 20

function notMoveArea(getRect: () => DOMRect | undefined) {
    return function snapToGrid(args: MyParamsType<Modifier>) {
        const { transform, containerNodeRect, draggingNodeRect } = args
        const notMoveAreaRect = getRect?.()
        const originX = Math.ceil(transform.x / gridSize) * gridSize;
        const originY = Math.ceil(transform.y / gridSize) * gridSize;
        if (notMoveAreaRect) {
            const diffX = notMoveAreaRect.x - originX;
            const diffY = notMoveAreaRect.y - originY;
            let x = originX;
            let y = originY
            // 左上角
            if (diffX < 0 && diffX >= -notMoveAreaRect.width) {
                x = originX >= - notMoveAreaRect.width / 2 ? notMoveAreaRect.x : notMoveAreaRect.x + notMoveAreaRect.width
            }

            if (diffY < 0 && diffY >= -notMoveAreaRect.height) {
                y = originY >= - notMoveAreaRect.height / 2 ? notMoveAreaRect.y : notMoveAreaRect.y + notMoveAreaRect.height
            }
            if (diffX < 0 && diffY < 0) {
                return {
                    ...transform,
                    x,
                    y
                }
            }
        }

        return {
            ...transform,
            x: originX,
            y: originY,
        }
    }
}

export default function App() {
    const [isDropped, setIsDropped] = useState(false)
    const notMoveRef = useRef()
    const draggableMarkup = <Draggable>Drag me</Draggable>

    const handleDragEnd = (event: any) => {
        console.log(' notMoveRef.current', notMoveRef.current)
        if (event.over && event.over.id === 'droppable') {
            setIsDropped(true)
        }
    }

    return (
        <DndContext
            onDragEnd={handleDragEnd}
            modifiers={[
                notMoveArea(() => {
                    if (typeof document !== 'undefined') {
                        const ele = document.getElementById('droppable')
                        return ele?.getBoundingClientRect?.()
                    }
                }),
            ]}
        >
            <div className="w-screen h-screen">
                {!isDropped ? draggableMarkup : null}
                <Droppable ref={notMoveRef}>
                    {isDropped ? draggableMarkup : 'Drop here'}
                </Droppable>
            </div>
        </DndContext>
    )
}
