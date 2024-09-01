import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { useDroppable } from '@dnd-kit/core';

export default forwardRef(function Droppable(props: any, ref) {

    const { isOver, setNodeRef, rect } = useDroppable({
        id: 'droppable',
        disabled: true,
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };

    useImperativeHandle(ref, () => ({
        getRect: () => {
            console.log('rect', rect)
            return rect?.current
        }
    }))


    return (
        <div id="droppable" className='w-[300px] h-[300px] ml-[300px] bg-white' ref={ele => setNodeRef(ele)} style={style}>
            {props.children}
        </div>
    );
})